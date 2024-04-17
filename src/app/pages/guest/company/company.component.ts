import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, timer } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { ToastService } from 'src/app/services/toast.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ApiService } from 'src/app/services/api.service';



const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#1976d2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit{

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  public primaryColour = SecondaryBlue;
  public secondaryColour = PrimaryRed;
  public coloursEnabled = false;

  user : any = JSON.parse(localStorage.getItem('user') || '{}');
  options : any = {};
  ob : any;
  sub : any;
  domaineUrl : any;
  jobs = [];
  p : any ;

  constructor(
    public router : Router,
    private notice : ToastService,
    private tools: ToolsService,
    private api : ApiService,
    private route : ActivatedRoute,
  
  ){
  
  }



  ngOnInit(): void {
    this.sub = this.route
    .queryParams
    .subscribe(params => {
      this.ob = params;
      //console.log("icici ", this.ob.id)
    //  this.user = 
      this.getOptions(this.ob.id);
    });
  }

  getOptions(id){
    this.domaineUrl = this.api.domain_url;
    this.loading = true;
    this.api.postDataAuth("get_enterprise", {id : id}).subscribe(
      (res) => {
        console.log("res", res);
        this.options = res;
        this.jobs = this.options.jobs;
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
}
