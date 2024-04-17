import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/guest/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ResetComponent } from './pages/auth/reset/reset.component';
import { LogoutComponent } from './pages/auth/logout/logout.component';
import { DashboardComponent } from './pages/user/dashboard/dashboard.component';
import { ResendComponent } from './pages/auth/resend/resend.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { MyjobsComponent } from './pages/user/myjobs/myjobs.component';
import { BookmarksComponent } from './pages/user/bookmarks/bookmarks.component';
import { ProfileEnterpriseComponent } from './pages/enterprise/profile-enterprise/profile-enterprise.component';
import { AddJobComponent } from './pages/enterprise/add-job/add-job.component';
import { ManageJobsComponent } from './pages/enterprise/manage-jobs/manage-jobs.component';
import { CompaniesComponent } from './pages/guest/companies/companies.component';
import { CompanyComponent } from './pages/guest/company/company.component';
import { AuthGuard } from './guards/auth.guard';
import { JobsComponent } from './pages/guest/jobs/jobs.component';
import { JobComponent } from './pages/guest/job/job.component';
import { EdijobComponent } from './pages/enterprise/edijob/edijob.component';
import { OwnJobsComponent } from './pages/user/own-jobs/own-jobs.component';
import { MyJobComponent } from './pages/enterprise/my-job/my-job.component';
import { MyStudentsComponent } from './pages/enterprise/my-students/my-students.component';

const routes: Routes = [
  { 
   path: 'index', 
   component: JobsComponent 
   },
   { 
     path: 'logout', 
     component: LogoutComponent,
     canActivate: [AuthGuard]
   },
   { 
    path: 'login', 
    component: LoginComponent
  },
   { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
    { 
      path: 'my-jobs', 
      component: MyjobsComponent,
      canActivate: [AuthGuard]
    },
    { 
      path: 'bookmarks', 
      component: BookmarksComponent,
      canActivate: [AuthGuard]
    },
   { 
    path: 'register', 
    component: RegisterComponent
  },
  { 
    path: 'reset', 
    component: ResetComponent
  },
  { 
    path: 'resend', 
    component: ResendComponent
  },
  { 
    path: 'verify', 
    component: ResendComponent
  },
  { 
    path: 'companies', 
    component: CompaniesComponent
  },
  { 
    path: 'jobs', 
    component: JobsComponent
  },
  { 
    path: 'job', 
    component: JobComponent
  },
  { 
    path: 'company', 
    component: CompanyComponent
  },
  { 
    path: 'manage-jobs', 
    component: ManageJobsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'own-jobs', 
    component: OwnJobsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'add-job', 
    component: AddJobComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'my-job', 
    component: MyJobComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'my-students', 
    component: MyStudentsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'edit-job', 
    component: EdijobComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'profile-enterprise', 
    component: ProfileEnterpriseComponent,
    canActivate: [AuthGuard]
  },
  { 
     path: '', redirectTo: 'jobs', pathMatch: 'full' },
];

@NgModule({
  imports: [
    ///RouterModule.forRoot(routes)
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
   }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
