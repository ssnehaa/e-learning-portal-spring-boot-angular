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
export class ForumService {

  constructor(private http: HttpClient,
    private tokenStorage: TokenStorageService
    ) { }

    addComment(courseName, username, comment): Observable<any> {
        return this.http.post(AUTH_API + 'addComment', {
          courseName: courseName,
          username: username,
          comment: comment.comment
        }, httpOptions);
      }

      getComments(courseName): Observable<any> {
        return this.http.get(AUTH_API + 'getComment/' + courseName);
      }

  }
