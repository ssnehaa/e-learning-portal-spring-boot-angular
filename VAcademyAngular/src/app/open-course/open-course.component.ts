import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { CourseService } from '../services/course.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { teacherCourse } from '../services/teacherCourse.service';
import { Router } from '@angular/router';
import { CourseVideoService } from '../services/courseVideo.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-open-course',
  templateUrl: './open-course.component.html',
  styleUrls: ['./open-course.component.css']
})
export class OpenCourseComponent implements OnInit {

  id: any;
  courseName: any;
  courseCategory: any;
  courseClass: any;
  courseTeacher: any;
  isStudent: boolean = false;
  assng: boolean = false;

  openAssng = false;
  submitted = false;

  uploadLecturesForm: FormGroup;
  loading = false;

  lectures: any;
  errorMessage: String;
  showModalLecture = false;

  constructor(private courseService: CourseService,
    private authService: AuthService,
    private courseVideoService: CourseVideoService,
    private teacherCourseService: teacherCourse,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getUser().role == 'student') {
      this.isStudent = true;
    }
    this.id = this.courseService.getCourseId();
    this.teacherCourseService.getCourseById(this.id).subscribe(
      data => {
        this.courseName = data.courseName;
        this.courseCategory = data.category;
        this.courseClass = data.sclass;
        this.courseTeacher = data.teacherName;
      },
      err => {
        console.log("ERROR : ", err.error.message);
      }
    );

    this.uploadLecturesForm = this.fb.group({
      title: ['', Validators.required],
      courseUrl: ['', Validators.required],
      posterImage: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.courseVideoService.getLectures(this.courseService.getCourseName()).subscribe(
      data => {
        this.lectures = data;
        for(var i = 0; i < this.lectures.length; i++) { }
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    );
  }

  get lectureUpload() { return this.uploadLecturesForm.controls; }

  uploadLectures() {
    this.showModalLecture = true;
  }

  closeModal() {
    this.showModalLecture = false;
  }

  seeAssng() {
    this.openAssng = true;
  }

  newLecture(){
    this.submitted = true;
    if (this.uploadLecturesForm.invalid) {
      return;
  }
  this.loading = true;
    this.courseVideoService.addLecture(this.courseName, this.uploadLecturesForm.value).subscribe(
      data => {
        this.alertService.confirmThis("Updated");
      },
      err => {
        this.errorMessage = err.error.message;
        this.loading = false;
        this.alertService.confirmThis("Failed!" + this.errorMessage);
      }
    );
    this.submitted = false;
    this.closeModal();
    window.location.reload();
  }

  open(id) {
    this.courseVideoService.saveVideoId(id);
    this.router.navigate(['/lectures']);
  }

}
