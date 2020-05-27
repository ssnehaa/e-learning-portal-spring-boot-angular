import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { CourseService } from '../services/course.service';
import { ForumService } from '../services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  commentForm: FormGroup;
  loading = false;
  errorMessage: String;
  submitted = false;

  comments: any;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private forumService: ForumService,
    private tokenService: TokenStorageService,
    private courseService: CourseService
    ) { }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });


    this.forumService.getComments(this.courseService.getCourseName()).subscribe(
      data => {
        this.comments = data;
      },
      err => {
        console.log(err.error.message);
      }
    );

  }

  get login() { return this.commentForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.commentForm.invalid) {
      return;
    }
    console.log("CALLED");
    this.loading = true;
    this.forumService.addComment(this.courseService.getCourseName(), this.tokenService.getUser().name, this.commentForm.value).subscribe(
      data => {
        console.log(data);
        //alert("Your login is successful!");
      },
      err => {
        this.errorMessage = err.error.message;
        this.loading = false;
        alert(this.errorMessage);
      }
    );
    window.location.reload();
  }

}
