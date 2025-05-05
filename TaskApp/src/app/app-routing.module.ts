import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employeeComponents/employee-dashboard/employee-dashboard.component';
import { ManagerDashboardComponent } from './managerComponents/manager-dashboard/manager-dashboard.component';
import { AdminDashboardComponent } from './adminComponents/admin-dashboard/admin-dashboard.component';
import { CreateTaskComponent } from './managerComponents/create-task/create-task.component';
import { ViewTeamComponent } from './managerComponents/view-team/view-team.component';
import { ViewTeamMembersComponent } from './adminComponents/view-team-members/view-team-members.component';
import { ViewManagersComponent } from './adminComponents/view-managers/view-managers.component';
import { ViewTaskComponent } from './adminComponents/view-task/view-task.component';
import { MyManagerComponent } from './employeeComponents/my-manager/my-manager.component';
import { MyTasksComponent } from './employeeComponents/my-tasks/my-tasks.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { adminGuard } from './guards/admin.guard';
import { employeeGuard } from './guards/employee.guard';
import { managerGuard } from './guards/manager.guard';
import { ViewMyTaskComponent } from './managerComponents/view-my-task/view-my-task.component';
import { UnathourizedComponent } from './unathourized/unathourized.component';
import { DeletedListsComponent } from './adminComponents/deleted-lists/deleted-lists.component';
import { AssignTeamComponent } from './adminComponents/assign-team/assign-team.component';
import { TaskResolver } from './managerComponents/services/task.resolver';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChartsComponent } from './adminComponents/charts/charts.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeDashboardComponent,
    canActivate: [employeeGuard],
  },
  {
    path: 'manager',
    component: ManagerDashboardComponent,
    canActivate: [managerGuard],
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
  },
  // manager sub routes
  {
    path: 'manager/task',
    component: CreateTaskComponent,
    canActivate: [managerGuard],
    resolve: { task: TaskResolver },
  },
  {
    path: 'manager/team-members',
    component: ViewTeamComponent,
    canActivate: [managerGuard],
  },
  {
    path: 'manager/my-task',
    component: ViewMyTaskComponent,
    canActivate: [managerGuard],
  },
  // admin sub routes
  {
    path: 'admin/employees',
    component: ViewTeamMembersComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/deleted-lists',
    component: DeletedListsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/assign-team',
    component: AssignTeamComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/managers',
    component: ViewManagersComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/tasks',
    component: ViewTaskComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/charts',
    component: ChartsComponent,
    canActivate: [adminGuard],
  },
  // employee sub routes
  {
    path: 'employee/my-task',
    component: MyTasksComponent,
    canActivate: [employeeGuard],
  },
  {
    path: 'employee/my-manager',
    component: MyManagerComponent,
    canActivate: [employeeGuard],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [authGuard],
  },

  // login routes
  { path: 'auth/login', component: LoginComponent },
  // redirecting to login route
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // Registration routes
  { path: 'auth/register', component: RegistrationComponent },

  { path: 'unauth', component: UnathourizedComponent },

  { path: 'auth/forgot-password', component: ForgotPasswordComponent },

  { path: 'auth/reset-password/:token', component: ResetPasswordComponent },

  { path: '**', component: UnathourizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
