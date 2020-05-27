import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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
        let params = new HttpParams()
        .set('courseName', courseName);
        return this.http.post(AUTH_API + 'lecture', params);
      }

      getLectureById(id) {
        let params = new HttpParams()
        .set('id', id);
        return this.http.post(AUTH_API + 'getCourseVideo', params);
      }

      public saveVideoId(id) {
        this.currentVideoId = id;
        window.sessionStorage.removeItem(COURSE_NAME);
        window.sessionStorage.setItem(COURSE_NAME, this.currentVideoId);
      }

      public getVideoId() {
        return this.currentVideoId;
        //return sessionStorage.getItem(VIDEO_KEY);
      }
  }

  //http://video-js.zencoder.com/oceans-clip.jpg
  //https://vjs.zencdn.net/v/oceans.mp4