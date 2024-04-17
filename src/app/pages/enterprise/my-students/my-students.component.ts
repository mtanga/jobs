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


const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#1976d2';

@Component({
  selector: 'app-my-students',
  templateUrl: './my-students.component.html',
  styleUrls: ['./my-students.component.css']
})
export class MyStudentsComponent implements OnInit{

  public Editor = ClassicEditor;



  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  public primaryColour = SecondaryBlue;
  public secondaryColour = PrimaryRed;
  public coloursEnabled = false;

  companies: any  = {};
  companiess: any  = {};
  companiesObject: any  = {};
  domaineUrl : any = {};
  term : any;
  p : any ;
  perpage = 10;
  user : any = JSON.parse(localStorage.getItem('user') || '{}');


  sectionsPages = [
    {
      number : 10,
      name : "10 par page",
    },
    {
      number : 50,
      name : "50 par page",
    },
    {
      number : 100,
      name : "100 par page",
    },
    {
      number : 150,
      name : "150 par page",
    },
  ];




  constructor(
    public router : Router,
    private notice : ToastService,
    private tools: ToolsService,
    private api : ApiService,

  ) { 

  }



  ngOnInit(): void {
    this.domaineUrl = this.api.domain_url;
    this.getStudents();
  }

  changetaile(event){
      console.log("ici", event.target.value);
      this.perpage = event.target.value;
  }

  search(){
    if(this.term==''){
      this.companies = this.companiesObject.data;
    }
    else{
      this.companies = this.companiesObject.data?.filter((donnee: any) => {
        return donnee.student.first_name.toLocaleLowerCase().includes(this.term.toLocaleLowerCase()) ||
        donnee.student.last_name.toLocaleLowerCase().includes(this.term.toLocaleLowerCase());
      });
    } 
  }

  getStudents(){
    this.loading = true;
    this.api.postDataAuth("my_students", {id : this.user.user.enterprise.id}).subscribe(
      (res) => {
        console.log("Mes employes", res);
        this.companiesObject = res;
        this.companies = this.companiesObject.data;
        this.loading = false;
        //...
      },
      (err) => {
        this.loading = false;
        //...
      }
    );
  }

  goto(item){
      let param = {
        id : item
      };
      this.tools.goTo("company", param);
  }

}

