import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

const VIDEO_KEY = 'auth-video';
const COURSE_NAME = 'auth-courseName';


const AUTH_API = 'http://localhost:8081/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CourseVideoService {

  currentVideoId: any;

  constructor(private http: HttpClient,
    private tokenStorage: TokenStorageService
    ) { }

    addLecture(courseName, lectureDetails) {
        let params = new HttpParams()
        .set('courseName', courseName)
        .set('courseUrl', lectureDetails.courseUrl)
        .set('posterImage', lectureDetails.posterImage)
        .set('name', lectureDetails.title)
        .set('description', lectureDetails.description);
        return this.http.post(AUTH_API + 'addVideo', params);
      }

      getLectures(courseName) {
        return this.http.get(AUTH_API + 'lecture/' + courseName);
      }

      getLectureById(id) {
        return this.http.get(AUTH_API + 'getCourseVideo/' + id);
      }

      public saveVideoId(id) {
        this.currentVideoId = id;
        window.sessionStorage.removeItem(COURSE_NAME);
        window.sessionStorage.setItem(COURSE_NAME, this.currentVideoId);
      }

      public getVideoId() {
        return this.currentVideoId;
      }
  }
