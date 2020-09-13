import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShowCoursesComponent } from './show-courses/show-courses.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { ProfileComponent } from './profile/profile.component';
import { OpenCourseComponent } from './open-course/open-course.component';
import { DetailsUploadComponent } from './upload/details-upload/details-upload.component';
import { FormUploadComponent } from './upload/form-upload/form-upload.component';
import { ListUploadComponent } from './upload/list-upload/list-upload.component';
import { HeaderComponent } from './layout/header.component';
import { AuthGuard } from './guards/auth.guard';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ShowAssngmentComponent } from './show-assngment/show-assngment.component';
import { LogoutComponent } from './logout/logout.component';
import { StudAssngComponent } from './stud-assng/stud-assng.component';
import { TeacherAssngmentComponent } from './teacher-assngment/teacher-assngment.component';
import { ForumComponent } from './forum/forum.component';
import { DisplayVideosComponent } from './display-videos/display-videos.component';
import { AlertComponent } from './alert/alert.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'openCourse', component: OpenCourseComponent, canActivate: [AuthGuard] },
  { path: 'myCourse', component: MyCoursesComponent, canActivate: [AuthGuard] },
  { path: 'myProfile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'assng', component: ShowAssngmentComponent, canActivate: [AuthGuard] },
  { path: 'assngTeacher', component: TeacherAssngmentComponent, canActivate: [AuthGuard] },
  { path: 'lectures', component: DisplayVideosComponent, canActivate: [AuthGuard] },
  { path: 'forum', component: ForumComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent },


  { path: '**', redirectTo: 'home' }
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    ShowCoursesComponent,
    MyCoursesComponent,
    ProfileComponent,
    OpenCourseComponent,
    DetailsUploadComponent,
    FormUploadComponent,
    ListUploadComponent,
    HeaderComponent,
    AllCoursesComponent,
    RegisterComponent,
    LoginComponent,
    ShowAssngmentComponent,
    LogoutComponent,
    StudAssngComponent,
    TeacherAssngmentComponent,
    ForumComponent,
    DisplayVideosComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),

    BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
