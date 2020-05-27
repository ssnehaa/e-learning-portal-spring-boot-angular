import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { CourseService } from '../services/course.service';
import { CourseVideoService } from '../services/courseVideo.service';

@Component({
  selector: 'app-display-videos',
  templateUrl: './display-videos.component.html',
  styleUrls: ['./display-videos.component.css']
})
export class DisplayVideosComponent implements OnInit {

  constructor(
    private courseVideoService: CourseVideoService,
    private courseService: CourseService
  ) { }

  id: any;
  lecture: any;
  errorMessage: String;
  url: any;
  posterImage: any;
  description: any;

  ngOnInit() {
    this.id = this.courseVideoService.getVideoId();
    console.log(this.id);
    this.courseVideoService.getLectureById(this.id).subscribe(
      data => {
        this.lecture = data;
        this.url = this.lecture.courseUrl;
        this.posterImage = this.lecture.posterImage;
        this.description = this.lecture.description;
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    );
  }

  

  name = "Angular";
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  toggleVideo() {
    this.videoplayer.nativeElement.play();
  }
  playPause() {
    var myVideo: any = document.getElementById("my_video_1");
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
  }

  makeBig() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 560;
  }

  makeSmall() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 320;
  }

  makeNormal() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 420;
  }

  skip(value) {
    let video: any = document.getElementById("my_video_1");
    video.currentTime += value;
  }

  restart() {
    let video: any = document.getElementById("my_video_1");
    video.currentTime = 0;
  }

  showLectures() {
  }
}
