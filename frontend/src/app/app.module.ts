import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './boilerplates/header/header.component';
import { EmpNavbarComponent } from './boilerplates/emp-navbar/emp-navbar.component';
import { EmployeeDashboardComponent } from './users/employee/employee-dashboard/employee-dashboard.component';
import { BgComponent } from './boilerplates/bg/bg.component';
import { MyInfoComponent } from './users/employee/my-info/my-info.component';
import { PayStubsComponent } from './users/employee/pay-stubs/pay-stubs.component';
import { TimePunchesComponent } from './users/employee/time-punches/time-punches.component';
import { EPtoComponent } from './users/employee/e-pto/e-pto.component';
import { PunchClockComponent } from './users/employee/punch-clock/punch-clock.component';
import { HrDashboardComponent } from './users/hr/hr-dashboard/hr-dashboard.component';
import { HrNavbarComponent } from './boilerplates/hr-navbar/hr-navbar.component';
import { Bg2Component } from './boilerplates/bg2/bg2.component';
import { EmployeeSearchComponent } from './users/hr/employee-search/employee-search.component';
import { PunchSearchComponent } from './users/hr/punch-search/punch-search.component';
import { PtoReviewComponent } from './users/hr/pto-review/pto-review.component';
import { AddEmployeeComponent } from './users/hr/add-employee/add-employee.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { PopupModalComponent } from './boilerplates/popup-modal/popup-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    HeaderComponent,
    EmpNavbarComponent,
    EmployeeDashboardComponent,
    BgComponent,
    MyInfoComponent,
    PayStubsComponent,
    TimePunchesComponent,
    EPtoComponent,
    PunchClockComponent,
    HrDashboardComponent,
    HrNavbarComponent,
    Bg2Component,
    EmployeeSearchComponent,
    PunchSearchComponent,
    PtoReviewComponent,
    AddEmployeeComponent,
    CreateUserComponent,
    PopupModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
