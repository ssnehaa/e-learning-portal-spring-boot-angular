import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { teacherAssngService } from 'src/app/services/teacherAssng.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent {

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selected: boolean = false;
  uploadFile: any;

  constructor(private uploadService: AuthService,
    private teacherAssngService: teacherAssngService,
    private courseService: CourseService,
    private alertService: AlertService) { }


  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;
    this.selected = true;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadFile = this.currentFileUpload;
    this.teacherAssngService.pushFileToStorage(this.currentFileUpload, this.courseService.getCourseName()).subscribe(event => {
      this.alertService.confirmThis("Successfully added");
    },
    err => {
      //console.log(err);
      //alert(err);
    });

    this.selectedFiles = undefined;
  }

}
