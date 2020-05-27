import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { studentAssngService } from 'src/app/services/studentAssng.service';
import { teacherAssngService } from 'src/app/services/teacherAssng.service';

@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {

  showFile = false;
  fileUploads: Observable<string[]>;

  sub = false;

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selected: boolean = false;
  uploadFile: any;

  constructor(private uploadService: AuthService, private courseService: CourseService,
    private studentAssngService: studentAssngService,
    private teacherAssngService: teacherAssngService,
    private tokenService: TokenStorageService) { }

  ngOnInit() {
  }

  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
      this.fileUploads = this.teacherAssngService.getFiles(this.courseService.getCourseName());
    }
  }

  onSubmit() {
    this.sub = true;
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;
    this.selected = true;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadFile = this.currentFileUpload;
    this.studentAssngService.uploadAssng(this.currentFileUpload, this.courseService.getCourseName(), this.tokenService.getUser().name).subscribe(event => {
    alert("Successfully added");
    },
    err => {
      //console.log(err);
      //alert(err);
    });

    this.selectedFiles = undefined;
  }

}
