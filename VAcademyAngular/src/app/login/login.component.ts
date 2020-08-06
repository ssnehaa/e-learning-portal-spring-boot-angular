import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submittedLogin = false;
  loading = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get login() { return this.loginForm.controls; }

  onSubmit() {
    this.submittedLogin = true;
      if (this.loginForm.invalid) {
        return;
      }
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          //alert("Your login is successful!");
          this.router.navigate(['/dashboard']);
        },
        err => {
          this.errorMessage = err.error.message;
          this.loading = false;
          alert("Sign In failed!" + this.errorMessage);
        }
      );
  }
}
