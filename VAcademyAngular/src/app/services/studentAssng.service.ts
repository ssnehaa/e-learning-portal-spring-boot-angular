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
export class studentAssngService {

  constructor(private http: HttpClient,
    private tokenStorage: TokenStorageService
    ) { }

    uploadAssng(file: File, courseName, username) {
        const formdata: FormData = new FormData();
        formdata.append('file', file);
        formdata.append('courseName', courseName);
        formdata.append('username', username);
        return this.http.post(AUTH_API + 'file/uploadAssng', formdata, {
          reportProgress: true,
          responseType: 'text'
        });
      }

      getAssng(courseName, username): Observable<any> {
        const formdata: FormData = new FormData();
        formdata.append('courseName', courseName);
        formdata.append('userName', username);
        return this.http.post(AUTH_API + 'file/assng', formdata);
      }

      getAssngTeacher(courseName): Observable<any> {
        const formdata: FormData = new FormData();
        formdata.append('courseName', courseName);
        return this.http.post(AUTH_API + 'file/assngTeacher', formdata);
      }

      updateMarks(id, marks): Observable<any> {
        return this.http.put(AUTH_API + 'updateMarks', {
          id: id,
          marks: marks.marks
        }, httpOptions);
      }
  }