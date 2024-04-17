import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, timer } from 'rxjs';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { ToastService } from 'src/app/services/toast.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ApiService } from 'src/app/services/api.service';



const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#1976d2';

@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.component.html',
  styleUrls: ['./my-job.component.css']
})
export class MyJobComponent implements OnInit{

  
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  p : any;

  public primaryColour = SecondaryBlue;
  public secondaryColour = PrimaryRed;
  public coloursEnabled = false;

  bookamrData : any = {};

  user : any = JSON.parse(localStorage.getItem('user') || '{}');
  options : any = {};
  job : any = {};
  sub : any;
  ob : any;
  domaineUrl : any;

  constructor(
    public router : Router,
    private notice : ToastService,
    private tools: ToolsService,
    private api : ApiService,
    private route : ActivatedRoute,
  
  ){
  
  }

  

  ngOnInit(): void {
    this.domaineUrl = this.api.domain_url;
    this.sub = this.route
    .queryParams
    .subscribe(params => {
      this.ob = params;
      console.log("icici ", this.ob.id)
    //  this.user = 
      this.getOptions(this.ob.id);
    });
  }

  getOptions(id){
    this.loading = true;
    this.api.postDataAuth("get_job_with_options", {id : id}).subscribe(
      (res) => {
        console.log("Mes emplois", res);
        this.options = res;
        this.job = this.options.job;
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

  getStudent(id){
    let params = {
      id : id
    }
    this.tools.goTo("student", params);
  }


  enterprise(id){
    let params = {
      id : id
    }
    this.tools.goTo("company", params);
  }

  bookamrk(){
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
      //console.log(this.user);
      if(this.user.user.role.code=="CANDIDAT"){
        console.log("je suis la");
        let data = {
          user : this.user.user.id,
          student : this.user.user.student.id,
          job : this.ob.id,
          enterprise : this.job.enterprise_id
        };
        this.loading = true;
        this.api.postDataAuth("add_bookmark", data).subscribe(
          (res) => {
            console.log("res", res);
            this.bookamrData = res;
            this.loading = false;
            if(this.bookamrData.status == 1){
              this.notice.success("Emploi placé dans vos favoris", 'Favoris');
            }
            else{
              this.notice.warning("Cet emploi est déjà placé dans vos favoris", 'Favoris');
            }
            
            //...
          },
          (err) => {
            this.loading = false;
            //...
          }
        );

      }
      else{
        this.notice.warning("Vous devez être candidat pour faire cette action", "erreur de connexion");
      }
    }
    else{
      this.notice.warning("Vous devez vous connecter pour poursuivre", "erreur de connexion");
      this.tools.go("login");
    }

  }

  addStudent(id){
    console.log("je suis la", this.options.candidatures?.filter(item => item.status=='1').length)
    if( new Date(this.job.start) < new Date()){
      this.notice.warning("Emploi deja expiré", 'Candidatures');
    }
    else{
      if(this.job.places == this.options.candidatures?.filter(item => item.status=='1').length){
        this.notice.warning("Nombre de places dépassé", 'Candidatures');
      }
      else{
        let data = {
          id : id
        };
        this.loading = true;
         this.api.postDataAuth("accept", data).subscribe(
          (res) => {
            console.log("res", res);
            this.bookamrData = res;
            this.loading = false;
            this.getOptions(this.job.id);
            this.notice.success("Bravo! Vos venez d'embaucher un nouveau candidat", 'Favoris');
          },
          (err) => {
            this.loading = false;
            //...
          }
        ); 
      }

    }
  }


  
  deny(id){
        let data = {
          id : id
        };
        this.loading = true;
         this.api.postDataAuth("deny", data).subscribe(
          (res) => {
            console.log("res", res);
            this.bookamrData = res;
            this.loading = false;
            this.getOptions(this.job.id);
            this.notice.warning("Candidature refusée!", 'Favoris');
          },
          (err) => {
            this.loading = false;
            //...
          }
        ); 
      }


  checkJob(date){
    let dateNow = new Date();
    let retour = false;
    if( new Date(date)< new Date()){
       retour = true;
    }
    return retour
  }

  candidature(){
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
      //console.log(this.user);
      if(this.user.user.role.code=="CANDIDAT"){
        console.log("je suis la");
        let data = {
          user : this.user.user.id,
          student : this.user.user.student.id,
          job : this.ob.id,
          enterprise : this.job.enterprise_id
        };
        this.loading = true;
        this.api.postDataAuth("apply", data).subscribe(
          (res) => {
            console.log("res", res);
            this.bookamrData = res;
            this.loading = false;
            if(this.bookamrData.status == 1){
              this.notice.success("Votre candidature a été envoyé  au recruteur", 'Favoris');
            }
            else{
              this.notice.warning("Vous avez déjà candidaté pour cet emploi", 'Favoris');
            }
          },
          (err) => {
            this.loading = false;
            //...
          }
        );

      }
      else{
        this.notice.warning("Vous devez être candidat pour faire cette action", "erreur de connexion");
      }
    }
    else{
      this.notice.warning("Vous devez vous connecter pour poursuivre", "erreur de connexion");
      this.tools.go("login");
    }

  }

}
