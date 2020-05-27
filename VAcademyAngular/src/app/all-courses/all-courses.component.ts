import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { teacherCourse } from '../services/teacherCourse.service';
import { studentCourse } from '../services/studentCourse.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {

  courses: any;
  errorMessage = '';

  courseDetails: any;

  isCourse: boolean = false;
  showModalCourseDetails: boolean = false;

  studentId: any;
  studentName: any;

  constructor(private tokenStorage: TokenStorageService,
    private teacherCourseService: teacherCourse,
    private studentCourseService: studentCourse
    ) { }

  ngOnInit(): void {
    this.teacherCourseService.getCourses().subscribe(
      data => {
        this.courses = data;
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  openCourse(id) {
    this.isCourse = true;
    this.showModalCourseDetails = true;
    this.teacherCourseService.getCourseById(id).subscribe(
      data => {
        this.courseDetails = data;
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  hideModal()
  {
    this.showModalCourseDetails = false;
    this.isCourse = false;
  }

  registerStudent(courseId, courseName) {
    this.studentId = this.tokenStorage.getUser().id;
    this.studentName = this.tokenStorage.getUser().name;
    this.studentCourseService.addStudentCourse(courseId, courseName, this.studentId, this.studentName).subscribe(
      data => {
        this.courseDetails = data;
        alert("Registered!");
      },
      err => {
        this.errorMessage = err.error.message;
        alert(this.errorMessage);
      }
    );
    this.hideModal();
  }

}
