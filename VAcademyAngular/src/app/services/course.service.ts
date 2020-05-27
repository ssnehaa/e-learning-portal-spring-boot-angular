import { Injectable } from '@angular/core';

const COURSE_KEY = 'auth-course';
const COURSE_NAME = 'auth-courseName';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  currentCourseId: any;
  currentCourseName: any

  constructor() { }

  public saveCourseId(id) {
    this.currentCourseId = id;
    window.sessionStorage.removeItem(COURSE_KEY);
    window.sessionStorage.setItem(COURSE_KEY, this.currentCourseId);
  }

  public saveCourseName(courseName) {
    this.currentCourseName = courseName;
    window.sessionStorage.removeItem(COURSE_NAME);
    window.sessionStorage.setItem(COURSE_NAME, this.currentCourseName);
    
  }

  public getCourseId() {
    //return this.currentCourseId;
    return sessionStorage.getItem(COURSE_KEY);
  }

  public getCourseName() {
    //return this.currentCourseName;
    return sessionStorage.getItem(COURSE_NAME);
  }


}
