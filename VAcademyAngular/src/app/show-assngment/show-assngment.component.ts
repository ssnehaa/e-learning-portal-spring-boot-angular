import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseService } from '../services/course.service';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { studentAssngService } from '../services/studentAssng.service';
import { teacherAssngService } from '../services/teacherAssng.service';

@Component({
  selector: 'app-show-assngment',
  templateUrl: './show-assngment.component.html',
  styleUrls: ['./show-assngment.component.css']
})
export class ShowAssngmentComponent implements OnInit {

  fileUploads: Observable<string[]>;
  submittedFiles: Observable<string[]>;
  isTeacher = false;

  assng = false;
  myAssng = false;

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selected: boolean = false;
  uploadFile: any;

  constructor(private courseService: CourseService,
    private uploadService: AuthService,
    private studentAssngService: studentAssngService,
    private teacherAssngService: teacherAssngService,
    private tokenService: TokenStorageService) { }

  ngOnInit(): void {

    if(this.tokenService.getUser().role == 'teacher') {
      this.isTeacher = true;
    }
      console.log("COURSENAME : ", this.courseService.getCourseName());
      this.fileUploads = this.teacherAssngService.getFiles(this.courseService.getCourseName());
      
      console.log("USERNAME : ", this.tokenService.getUser().name);
      this.submittedFiles = this.studentAssngService.getAssng(this.courseService.getCourseName(), this.tokenService.getUser().name);
      console.log("CONSOLE : ", this.fileUploads);

      if(this.fileUploads != null) {
        this.assng = true;
      }
      if(this.submittedFiles != null) {
        this.myAssng = true;
      }

  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;
    this.selected = true;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadFile = this.currentFileUpload;
    console.log("NAME : " + this.currentFileUpload.name);
    console.log("USENAME : ", this.tokenService.getUser().name)
    this.studentAssngService.uploadAssng(this.currentFileUpload, this.courseService.getCourseName(), this.tokenService.getUser().name).subscribe(event => {
      console.log(event);
      alert("Successfully added");
    },
    err => {
      console.log(err);
      alert(err);
    });

    this.selectedFiles = undefined;
  }

  onClick(id) {
    console.log("ID : ", id);
  }

}
