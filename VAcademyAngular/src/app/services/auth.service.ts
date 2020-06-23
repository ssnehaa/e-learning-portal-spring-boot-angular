import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';


const AUTH_API = 'http://localhost:8081/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private tokenStorage: TokenStorageService
    ) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      name: user.name,
      role: user.role,
      email: user.email,
      password: user.password
      //about: user.about,
      //address: user.address
    }, httpOptions);
  }

  updateUser(user): Observable<any> {
    return this.http.put(AUTH_API + 'updateProfile', {
      id: this.tokenStorage.getUser().id,
      name: user.name,
      about: user.about,
      email: user.email,
      address: user.address
    }, httpOptions);
  }

  uploadImage(uploadImageData) {
    return this.http.post(AUTH_API + 'upload', uploadImageData);
  }

  getImage(imageName) {
    return this.http.post(AUTH_API + 'get', imageName);
  }

  editAbout(id, about): Observable<any> {
    let params = new HttpParams()
    .set('id', id)
    .set('about', about.about);
    return this.http.put(AUTH_API + 'updateAbout', params);
  }

  editName(id, name): Observable<any> {
    let params = new HttpParams()
    .set('id', id)
    .set('name', name.name);
    return this.http.put(AUTH_API + 'updateName', params);
  }

  editUsername(id, username): Observable<any> {
    let params = new HttpParams()
    .set('id', id)
    .set('username', username.username);
    return this.http.put(AUTH_API + 'updateUsername', params);
  }

  editEmail(id, email): Observable<any> {
    let params = new HttpParams()
    .set('id', id)
    .set('email', email.email);
    return this.http.put(AUTH_API + 'updateEmail', params);
  }

  editAddress(id, address): Observable<any> {
    let params = new HttpParams()
    .set('id', id)
    .set('address', address.address);
    return this.http.put(AUTH_API + 'updateAddress', params);
  }

}
