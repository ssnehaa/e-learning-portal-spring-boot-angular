import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { CourseService } from '../services/course.service';
import { ForumService } from '../services/forum.service';
import { AlertService } from '../services/alert.service';

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

  retrievedImage: any;
  base64Data: any;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private forumService: ForumService,
    private tokenService: TokenStorageService,
    private courseService: CourseService,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });


    this.forumService.getComments(this.courseService.getCourseName()).subscribe(
      data => {
        this.comments = data;
<<<<<<< HEAD
        //console.log("COMMENTS ", this.comments);
      //this.base64Data = this.comments.picByte;
      //this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        for(var i = 0; i < this.comments.length; i++) {
          console.log("COMMENTS ", this.comments[i].student.picByte);
          //this.base64Data = this.comments[i].student.picByte;
      //this.retrievedImage[i] = 'data:image/jpeg;base64,' + this.base64Data;
      if(this.comments[i].student.picByte != null)
          this.comments[i].student.picByte = 'data:image/jpeg;base64,'+this.comments[i].student.picByte;
=======
      //this.base64Data = this.comments.picByte;
      //this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        for(var i = 0; i < this.comments.length; i++) {
          this.comments[i].picByte = 'data:image/jpeg;base64,'+this.comments[i].picByte;
>>>>>>> 2e9c805fc8ca8c59496db8c5dd8be397305068a6
        }
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
    this.loading = true;
    this.forumService.addComment(this.courseService.getCourseName(), this.tokenService.getUser().name, this.commentForm.value).subscribe(
      data => {
        console.log(data);
        //alert("Your login is successful!");
      },
      err => {
        this.errorMessage = err.error.message;
        this.loading = false;
        this.alertService.confirmThis((String)(this.errorMessage));
      }
    );
    window.location.reload();
  }

}
