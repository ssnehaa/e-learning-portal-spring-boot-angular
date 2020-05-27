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
export class studentCourse {

    constructor(private http: HttpClient,
        private tokenStorage: TokenStorageService
        ) { }

        getCourseByStudentId(id): Observable<any> {
            let params = new HttpParams()
            .set('studentId', id);
            return this.http.post(AUTH_API + 'studentCourse', params);
          }

          addStudentCourse(courseId, courseName, studentId, studentName): Observable<any> {
            return this.http.post(AUTH_API + 'addStudentCourse', {
              courseId: courseId,
              courseName: courseName,
              studentId: studentId,
              studentName: studentName
            }, httpOptions);
          }
    }