import { Component, OnInit } from '@angular/core';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{


  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  public primaryColour = SecondaryBlue;
  public secondaryColour = PrimaryRed;
  public coloursEnabled = false;


  user : any = {
    password : "",
    email : "",
    role : "",
    policy : false,
    role_code : ""
  };

  registered : any = {};

  roles : any = {};


  constructor(
    private notice : ToastService,
    private tools: ToolsService,
    private api : ApiService,
  )
  {
   
  }


  ngOnInit() {
    this.getRoles();
  }

  onSavePolicyChanged(){
    this.user.policy = !this.user.policy;
  }

  getRoles(){
    this.loading = true;
    this.api.getDataSample("roles").subscribe(
      (res) => {
        console.log("res", res);
        this.roles = res;
        this.loading = false;
        //...
      },
      (err) => {
        this.loading = false;
        //...
      }
    ); 
  }


  register() {
    this.user.role_code = this.roles.data.find(x => x.id == this.user.role).code;
    console.log("monuser", this.user);
    ///return 0;

    console.log("ggg", this.user);
    if(this.user.role == null || this.user.role==undefined || this.user.role==""){
      this.notice.error("Veuillez spécifier votre rôle", "Création de compte");
    }
    else if(this.user.email == null || this.user.email==undefined || this.user.email==""){
      this.notice.error("Veuillez renseigner votre e-mail", "Création de compte");
    }
    else if(this.tools.checkemail(this.user.email)==false){
      this.notice.error("Veuillez renseigner une e-mail correcte", "Création de compte");
    }
    else if(this.user.password == null || this.user.password==undefined || this.user.password=="" || this.user.password.length<6){
      this.notice.error("Veuillez renseigner votre mot de passe d' au moins 6 caractères.", "Création de compte");
    }
    else if(this.user.policy == false){
      this.notice.error("Veuillez cccepter nos termes et conditions.", "Création de compte");
    }
    else{
      this.loading = true;

      this.api.samplePost("register", this.user).subscribe(
       (res) => {
         console.log("res", res);
         this.registered = res;
         this.loading = false;
         if(this.registered.status=="203"){
          this.notice.error("Un compte est déjà enregistré avec "+this.user.email, "Création de compte");
         }
         if(this.registered.status=="200"){
          this.notice.success("Bravo! Vous venez de créer votre compte. Veuillez cliquer consulter votre "+this.user.email+" pour activer votre compte.", "Création de compte");
          localStorage.setItem('email', this.user.email);
          this.user = {
            password : "",
            email : "",
            role : "",
            policy : false
          };
          this.tools.go("verify");
         }
       },
       (err) => {
         this.loading = false;
         //...
       }
     ); 
    }

  }
}
