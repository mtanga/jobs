import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, timer } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { ToastService } from 'src/app/services/toast.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ApiService } from 'src/app/services/api.service';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { ConfirmService } from 'src/app/dialogs/confirm/confirm.service';


const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#1976d2';


@Component({
  selector: 'app-myjobs',
  templateUrl: './myjobs.component.html',
  styleUrls: ['./myjobs.component.css']
})
export class MyjobsComponent implements OnInit{
[x: string]: any;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  public primaryColour = SecondaryBlue;
  public secondaryColour = PrimaryRed;


  jobsObject : any = {};
  jobs : any = [];
  p : any ;
  user : any = JSON.parse(localStorage.getItem('user') || '{}');
  domaineUrl : any;

  constructor(
    public router : Router,
    private notice : ToastService,
    private tools: ToolsService,
    private api : ApiService,
    private confirmationDialogService: ConfirmService
  
  ){
  
  }


  ngOnInit(): void {
    this.domaineUrl = this.api.domain_url;
    this.getJobs();
  }

  getJobs(){
    this.loading = true;
    this.api.postDataAuth("candidatures", {id : this.user.user.id}).subscribe(
      (res) => {
        console.log("res", res);
        this.jobsObject = res;
        this.jobs = this.jobsObject.data;
        this.loading = false;
        //...
      },
      (err) => {
        this.loading = false;
        //...
      }
    );
  }

  editJob(id){
    let params = {
      id : id
    }
    this.tools.goTo("edit-job", params);
  }


  public deleteJob(id) {
    this.confirmationDialogService.confirm('Veuillez confirmer...', 'Voulez-vous vraiment retirer votre candidature ... ?')
    .then((confirmed) =>{
      console.log("ici", confirmed)
      if(confirmed){
        this.deleteJobTrue(id);
      }
      //
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  deleteJobTrue(id){
      this.loading = true;
      this.api.postDataAuth("delete_candidature", {id : id}).subscribe(
        (res) => {
          console.log("res", res);
          this.getJobs();
          this.loading = false;
          this.notice.success("Candidature supprimée avec success", "");
          //...
        },
        (err) => {
          this.loading = false;
          //...
        }
      );
  }

}

