import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';
import { teacherCourse } from '../services/teacherCourse.service';
import { studentCourse } from '../services/studentCourse.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  errorMessage = '';
  myCourses: any = null;
  exists: boolean = false;
  teacher: boolean = false;
  student: boolean = false;

  submitted = false;

  newCourseForm: FormGroup;

  showModalCourse: boolean = false;
  isCourse: boolean = false;

  loading = false;

  constructor(private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private teacherCourseService: teacherCourse,
    private studentCourseService: studentCourse,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.tokenStorage.getUser().role == 'teacher') {
      this.teacher = true;
    }
    if(this.tokenStorage.getUser().role == 'student') {
      this.student = true;
    }
    if(this.teacher) {
      this.teacherCourseService.getCourseByTecaherId(this.tokenStorage.getUser().id).subscribe(
        data => {
          if(data) {
            this.exists = true;
            this.myCourses = data;
          }
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );
    }

    if(this.student) {
      this.studentCourseService.getCourseByStudentId(this.tokenStorage.getUser().id).subscribe(
        data => {
          if(data) {
            this.exists = true;
            this.myCourses = data;
          }
          console.log(data);
        },
        err => {
          this.errorMessage = err.error.message;
          console.log(this.errorMessage);
        }
      );
    }

    this.newCourseForm = this.formBuilder.group({
      courseName: ['', [Validators.required]],
      sclass: ['', Validators.required],
      category: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  get course() { return this.newCourseForm.controls; }

  hideCourse()
  {
    this.showModalCourse = false;
    this.submitted = false;
  }

  addCourse() {
    this.showModalCourse = true;
  }

  onSubmit() {
    this.submitted = true;
    if (this.newCourseForm.invalid) {
      return;
    }
    this.loading = true;
    this.teacherCourseService.addCourse(this.newCourseForm.value).subscribe(
      data => {
        alert("Course Added successfully!");
        this.hideCourse();
      },
      err => {
        this.errorMessage = err.error.message;
        this.loading = false;
        alert("Could not add course!" + this.errorMessage);
      }
    );
    window.location.reload();
  }

  openCourse(id, courseName) {
    this.isCourse = true;
    this.courseService.saveCourseId(id);
    this.courseService.saveCourseName(courseName);
    this.router.navigate(['/openCourse']);
  }

}
