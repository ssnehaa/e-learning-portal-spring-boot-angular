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
          teacherName: this.tokenStorage.getUser().name
        }, httpOptions);
      }

      getCourses(): Observable<any> {
        return this.http.get(AUTH_API + 'allCourses');
      }

      getCourseById(id): Observable<any> {
        let params = new HttpParams()
        .set('id', id);
        return this.http.post(AUTH_API + 'courseById', params);
      }

      getCourseByTecaherId(id): Observable<any> {
        let params = new HttpParams()
        .set('teacherId', id);
        return this.http.post(AUTH_API + 'courseByTeacherId', params);
      }
}
