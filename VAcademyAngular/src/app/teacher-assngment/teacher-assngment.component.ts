import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseService } from '../services/course.service';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { studentAssngService } from '../services/studentAssng.service';
import { teacherAssngService } from '../services/teacherAssng.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-teacher-assngment',
  templateUrl: './teacher-assngment.component.html',
  styleUrls: ['./teacher-assngment.component.css']
})
export class TeacherAssngmentComponent implements OnInit {

  fileUploads: Observable<string[]>;
  submittedFiles: Observable<string[]>;
  isTeacher = false;

  marksId: number;

  assng = false;
  myAssng = false;

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selected: boolean = false;
  uploadFile: any;

  showModalLogin: boolean;
  updateForm: FormGroup;
  submittedLogin = false;
  loading = false;

  constructor(private courseService: CourseService,
    private studentAssngService: studentAssngService,
    private teacherAssngService: teacherAssngService,
    private tokenService: TokenStorageService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) { }

  ngOnInit(): void {

    this.updateForm = this.formBuilder.group({
      marks: ['', Validators.required]
    });

    if(this.tokenService.getUser().role == 'teacher') {
      this.isTeacher = true;
    }
      this.fileUploads = this.teacherAssngService.getFiles(this.courseService.getCourseName());
     
      this.submittedFiles = this.studentAssngService.getAssngTeacher(this.courseService.getCourseName());

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
    this.studentAssngService.uploadAssng(this.currentFileUpload, this.courseService.getCourseName(), this.tokenService.getUser().name).subscribe(event => {
      this.alertService.confirmThis("Successfully added");
    },
    err => {
      console.log(err);
      this.alertService.confirmThis(err);
    });

    this.selectedFiles = undefined;
  }

  showLogin(id) {
    this.showModalLogin = true;
    this.marksId = id;
  }

  hideLogin() {
    this.showModalLogin = false;
    this.submittedLogin = false;
  }

  get login() { return this.updateForm.controls; }

  onSubmit() {
    if (this.updateForm.invalid) {
      return;
    }
    this.loading = true;
    this.studentAssngService.updateMarks(this.marksId, this.updateForm.value).subscribe(
      data => {
        console.log(data);
      },
      err => {
        //this.errorMessage = err.error.message;
        this.loading = false;
        //alert("Sign In failed!");
      }
    );
  }

  submitMarks(id) {
    this.studentAssngService.updateMarks(id, 70).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err.error.message);
        
      }
    );
  }

  uploadAssignment() {
    this.assng = true;
  }


}
