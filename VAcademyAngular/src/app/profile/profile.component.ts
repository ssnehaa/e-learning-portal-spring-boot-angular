import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  email: String = 'NA';
  name: String = 'NA';
  username = 'NA';
  role: String = '';
  address: String = 'NA';
  about: String = 'NA';
  id: number;
  flag: boolean = false;

  errorMessage = '';
  showModalUpdate: boolean = false;

  submitted = false;
  loading = false;

  profileUpdateForm: FormGroup;
  updateAboutForm: FormGroup;
  updateNameForm: FormGroup;
  updateUsernameForm: FormGroup;
  updateEmailForm: FormGroup;
  updateAddressForm: FormGroup;

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  showModalAbout = false;
  showModalName = false;
  showModalUsername = false;
  showModalEmail = false;
  showModalAddress = false;

  constructor(private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private fb: FormBuilder,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.id = this.tokenStorage.getUser().id;
    this.email = this.tokenStorage.getUser().email;
    this.name = this.tokenStorage.getUser().name;
    this.username = this.tokenStorage.getUser().username;
    this.role = this.tokenStorage.getUser().role;
    if(this.tokenStorage.getUser().about)
      this.about = this.tokenStorage.getUser().about;
    if(this.tokenStorage.getUser().address)
      this.address = this.tokenStorage.getUser().address;
    if(this.role == "teacher") {
      this.flag = true;
    }

    this.profileUpdateForm = this.fb.group({
      name: ['', Validators.required],
      about: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      address: ['', Validators.required]
  });

  this.updateAboutForm = this.fb.group({
    about: ['', Validators.required],
});

this.updateNameForm = this.fb.group({
  name: ['', Validators.required],
});

this.updateUsernameForm = this.fb.group({
  username: ['', Validators.required],
});

this.updateEmailForm = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
});

this.updateAddressForm = this.fb.group({
  address: ['', Validators.required],
});

  this.authService.getImage(this.username).subscribe(
    data => {
      this.retrieveResonse = data;
      this.base64Data = this.retrieveResonse.picByte;
      this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    },
    err => {
      console.log(err.error.message);
    }
  );

  }

  get up() { return this.profileUpdateForm.controls; }

  update() {
    this.showModalUpdate = true;
  }

  hideUpdateForm()
  {
    this.showModalUpdate = false;
  }

  onSubmit() {
    if(this.profileUpdateForm) {
      this.submitted = true;
      if (this.profileUpdateForm.invalid) {
          return;
      }
      this.loading = true;
      this.authService.updateUser(this.profileUpdateForm.value).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.alertService.confirmThis("Updated");
          this.loading = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.loading = false;
          this.alertService.confirmThis("Failed!" + this.errorMessage);
        }
      );
      this.submitted = false;
      this.hideUpdateForm();
    }
  }

  public onFileChanged(event) {

    this.selectedFile = event.target.files[0];
    
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.username);

    this.authService.uploadImage(uploadImageData).subscribe(
      data => {
        console.log("Image uploaded successfully");
      },
      err => {
        console.log(err.error.message);
      }
    );
    window.location.reload();
  }

    onUpload() {
      
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile, this.username);

      this.authService.uploadImage(uploadImageData).subscribe(
        data => {
          console.log("Image uploaded successfully");
        },
        err => {
          console.log(err.error.message);
        }
      );
    }

    showAbout() {
      this.showModalAbout = true;
    }
    
    hideAbout() {
      this.showModalAbout = false;
    }

    showName() {
      this.showModalName = true;
    }
    
    hideName() {
      this.showModalName = false;
    }

    showUsername() {
      this.showModalUsername = true;
    }
    
    hideUsername() {
      this.showModalUsername = false;
    }

    showEmail() {
      this.showModalEmail = true;
    }
    
    hideEmail() {
      this.showModalEmail = false;
    }

    showAddress() {
      this.showModalAddress = true;
    }
    
    hideAddress() {
      this.showModalAddress = false;
    }

    get aboutEdit() { return this.updateAboutForm.controls; }
    get nameEdit() { return this.updateNameForm.controls; }
    get usernameEdit() { return this.updateUsernameForm.controls; }
    get emailEdit() { return this.updateEmailForm.controls; }
    get addressEdit() { return this.updateAddressForm.controls; }

    editAbout(){
      this.submitted = true;
      if (this.updateAboutForm.invalid) {
        return;
      }
      this.authService.editAbout(this.id, this.updateAboutForm.value).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.alertService.confirmThis("About is updated");
        },
        err => {
          this.errorMessage = err.error.message;
          this.alertService.confirmThis("Failed!" + this.errorMessage);
        }
      );
      this.submitted = false;
      this.hideAbout();
    }
    editName(){
      this.submitted = true;
      if (this.updateNameForm.invalid) {
        return;
      }
      this.authService.editName(this.id, this.updateNameForm.value).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.alertService.confirmThis("Updated");
        },
        err => {
          this.errorMessage = err.error.message;
          this.alertService.confirmThis("Failed!" + this.errorMessage);
        }
      );
      this.submitted = false;
      this.hideName();
    }
    editEmail(){    
      this.submitted = true;
      if (this.updateEmailForm.invalid) {
        return;
      }
      this.authService.editEmail(this.id, this.updateEmailForm.value).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.alertService.confirmThis("Updated");
          },
        err => {
          this.errorMessage = err.error.message;
          this.alertService.confirmThis("Failed!" + this.errorMessage);
        }
      );
      this.submitted = false;
      this.hideEmail();
    }
    editAddress(){        
      this.submitted = true;
      if (this.updateAddressForm.invalid) {
        return;
      }
      this.authService.editAddress(this.id, this.updateAddressForm.value).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.alertService.confirmThis("Updated");
        },
        err => {
          this.errorMessage = err.error.message;
          this.alertService.confirmThis("Failed!" + this.errorMessage);
        }
      );
      this.submitted = false;
      this.hideAddress();
    }
}
