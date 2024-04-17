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
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit{
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
    this.api.postDataAuth("bookmarks", {id : this.user.user.id}).subscribe(
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




  public deleteJob(id) {
    this.confirmationDialogService.confirm('Veuillez confirmer...', 'Voulez-vous vraiment retirer ce emploi de vos favoris ... ?')
    .then((confirmed) =>{
      this.deleteJobTrue(id);
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  deleteJobTrue(id){
      this.loading = true;
      this.api.postDataAuth("delete_bookmark", {id : id}).subscribe(
        (res) => {
          console.log("res", res);
          this.getJobs();
          this.loading = false;
          this.notice.success("Emploi supprimé avec success", "");
          //...
        },
        (err) => {
          this.loading = false;
          //...
        }
      );
  }

}

