import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';

  options: string[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      //about: ['', Validators.required],
      //address: ['', Validators.required],
    });
    this.options = [
      'student',
      'teacher'
    ];
  }

  get register() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe(
      data => {
        this.alertService.confirmThis("Registration Sucessful");
        this.loading = false;
        this.router.navigate(['/login']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.loading = false;
        this.alertService.confirmThis("Sign Up failed");
        //alert("Sign Up failed!" + this.errorMessage);
      }
    );
  }

  /*showDialog() {  
    this.confirmDialogService.confirmThis("Are you sure to delete?", function () {  
      alert("Yes clicked");  
    }, function () {  
      alert("No clicked");  
    })  
  }*/
}
