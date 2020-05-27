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
export class teacherAssngService {

  constructor(private http: HttpClient,
    private tokenStorage: TokenStorageService
    ) { }

    pushFileToStorage(file: File, courseName) {
        const formdata: FormData = new FormData();
        formdata.append('file', file);
        formdata.append('courseName', courseName);
        return this.http.post(AUTH_API + 'file/upload', formdata, {
          reportProgress: true,
          responseType: 'text'
        });
      }

      getFiles(courseName): Observable<any> {
        const formdata: FormData = new FormData();
        formdata.append('courseName', courseName);
        return this.http.post(AUTH_API + 'file/course', formdata);
      }
  }