import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';


const AUTH_API = 'http://localhost:8081/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class teacherCourse {

    constructor(private http: HttpClient,
        private tokenStorage: TokenStorageService
        ) { }

    addCourse(course): Observable<any> {
        return this.http.post(AUTH_API + 'addCourse', {
          courseName: course.courseName,
          sclass: course.sclass,
          category: course.category,
          teacherId: this.tokenStorage.getUser().id,
          teacherName: this.tokenStorage.getUser().name,
          imageUrl: course.url
        }, httpOptions);
      }

      getCourses(): Observable<any> {
        return this.http.get(AUTH_API + 'allCourses');
      }

      getCourseById(id): Observable<any> {
        return this.http.get(AUTH_API + 'courseById/' + id);
      }

      getCourseByTecaherId(id): Observable<any> {
        return this.http.get(AUTH_API + 'courseByTeacherId/' + id);
      }
}
