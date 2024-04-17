import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/guest/header/header.component';
import { FooterComponent } from './partials/guest/footer/footer.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ResetComponent } from './pages/auth/reset/reset.component';
import { LogoutComponent } from './pages/auth/logout/logout.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/guest/home/home.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TermsComponent } from './pages/policy/terms/terms.component';
import { ConditionsComponent } from './pages/policy/conditions/conditions.component';
import { DashboardComponent } from './pages/user/dashboard/dashboard.component';
import { ResendComponent } from './pages/auth/resend/resend.component';
import { MyjobsComponent } from './pages/user/myjobs/myjobs.component';
import { BookmarksComponent } from './pages/user/bookmarks/bookmarks.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
//import { NgxConfirmModule } from '@nikiphoros/ngx-confirm';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AsyncPipe } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ManageJobsComponent } from './pages/enterprise/manage-jobs/manage-jobs.component';
import { ProfileEnterpriseComponent } from './pages/enterprise/profile-enterprise/profile-enterprise.component';
import { AddJobComponent } from './pages/enterprise/add-job/add-job.component';
import { CompaniesComponent } from './pages/guest/companies/companies.component';
import { CompanyComponent } from './pages/guest/company/company.component';
import { JobsComponent } from './pages/guest/jobs/jobs.component';
import { JobComponent } from './pages/guest/job/job.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EdijobComponent } from './pages/enterprise/edijob/edijob.component';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from './dialogs/confirm/confirm.service';
import { RouterModule } from '@angular/router';
import { OwnJobsComponent } from './pages/user/own-jobs/own-jobs.component';
import { SingleJobComponent } from './pages/user/single-job/single-job.component';
import { MyJobComponent } from './pages/enterprise/my-job/my-job.component';
import { MyStudentsComponent } from './pages/enterprise/my-students/my-students.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ResetComponent,
    LogoutComponent,
    RegisterComponent,
    HomeComponent,
    TermsComponent,
    ConditionsComponent,
    DashboardComponent,
    ResendComponent,
    MyjobsComponent,
    BookmarksComponent,
    ProfileComponent,
    ManageJobsComponent,
    ProfileEnterpriseComponent,
    AddJobComponent,
    CompaniesComponent,
    CompanyComponent,
    JobsComponent,
    JobComponent,
    EdijobComponent,
    ConfirmComponent,
    OwnJobsComponent,
    SingleJobComponent,
    MyJobComponent,
    MyStudentsComponent,
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    BrowserModule,
    HttpClientModule,
    //NgxConfirmModule,
    
    NgbModule,
    NgxPaginationModule,
    CKEditorModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: false,
    }),
  ],
  providers: [ConfirmComponent, ConfirmService],
 // entryComponents: [ ConfirmComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
