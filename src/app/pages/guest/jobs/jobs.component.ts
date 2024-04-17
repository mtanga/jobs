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
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit{

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  p : any ;
  term : any;
  public primaryColour = SecondaryBlue;
  public secondaryColour = PrimaryRed;


  jobsObject : any = {};
  jobs : any = [];
  jobss = [];
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
    this.api.getDataAuth("jobs").subscribe(
      (res) => {
        console.log("res", res);
        this.jobsObject = res;
        this.jobs = this.jobsObject.jobs;
        this.jobss = this.jobsObject.jobs;
        this.loading = false;
        //...
      },
      (err) => {
        this.loading = false;
        //...
      }
    );
  }

  getJob(id){
    let params = {
      id : id
    }
    this.tools.goTo("job", params);
  }


  search(){
    if(this.term==''){
      this.jobs = this.jobsObject.jobs;
    }
    else{
      this.jobs = this.jobss?.filter((donnee: any) => {
        return donnee.title.toLocaleLowerCase().includes(this.term.toLocaleLowerCase()) ||
        donnee.enterprise.name.toLocaleLowerCase().includes(this.term.toLocaleLowerCase());
      });
    } 
  }

}
