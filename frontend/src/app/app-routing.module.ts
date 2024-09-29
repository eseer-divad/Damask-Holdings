import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { EmployeeDashboardComponent } from './users/employee/employee-dashboard/employee-dashboard.component';
import { EPtoComponent } from './users/employee/e-pto/e-pto.component';
import { MyInfoComponent } from './users/employee/my-info/my-info.component';
import { PayStubsComponent } from './users/employee/pay-stubs/pay-stubs.component';
import { PunchClockComponent } from './users/employee/punch-clock/punch-clock.component';
import { TimePunchesComponent } from './users/employee/time-punches/time-punches.component';
import { HrDashboardComponent } from './users/hr/hr-dashboard/hr-dashboard.component';
import { EmployeeSearchComponent } from './users/hr/employee-search/employee-search.component';
import { PunchSearchComponent } from './users/hr/punch-search/punch-search.component';
import { PtoReviewComponent } from './users/hr/pto-review/pto-review.component';
import { AddEmployeeComponent } from './users/hr/add-employee/add-employee.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DeleteUserComponent } from './users/hr/delete-user/delete-user.component'


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: '', component: HomeComponent
  },
  {
    path: 'edashboard', component: EmployeeDashboardComponent
  },
  {
    path: 'my-pto', component: EPtoComponent
  },
  {
    path: 'my-info', component: MyInfoComponent
  },
  {
    path: 'my-stubs', component: PayStubsComponent
  },
  {
    path: 'time-clock', component: PunchClockComponent
  },
  {
    path: 'my-punches', component: TimePunchesComponent
  },
  {
    path: 'hdashboard', component: HrDashboardComponent
  },
  {
    path: 'employee-search', component: EmployeeSearchComponent
  },
  {
    path: 'punch-search', component: PunchSearchComponent
  },
  {
    path: "PTO-review", component: PtoReviewComponent
  },
  {
    path: "add_employee", component: AddEmployeeComponent
  },
  {
    path: "delete_employee", component: DeleteUserComponent
  },
  {
    path: "create-user", component: CreateUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
