import { Component } from '@angular/core';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  public primaryColour = SecondaryBlue;
  public secondaryColour = PrimaryRed;
  public coloursEnabled = false;


  user : any = {
    password : "",
    email : ""
  };

  registered : any = {};


  constructor(
    private notice : ToastService,
    private tools: ToolsService,
    private api : ApiService,
  )
  {
   
  }


  ngOnInit() {
  }



  login() {
   if(this.user.email == null || this.user.email==undefined || this.user.email==""){
      this.notice.error("Veuillez renseigner votre e-mail", "Création de compte");
    }
    else if(this.tools.checkemail(this.user.email)==false){
      this.notice.error("Veuillez renseigner une e-mail correcte", "Création de compte");
    }
    else if(this.user.password == null || this.user.password==undefined || this.user.password=="" || this.user.password.length<6){
      this.notice.error("Veuillez renseigner votre mot de passe d' au moins 6 caractères.", "Création de compte");
    }
    else{
      this.loading = true;
      this.api.samplePost("login", this.user).subscribe(
       (res) => {
         console.log("res", res);
         this.registered = res;
         this.loading = false;
         if(this.registered.status=="204"){
          this.notice.error("Vous devez activer votre compte avant de se connecter.", "Connexion au compte");
          localStorage.setItem('email', this.user.email);
          this.tools.go("verify");
         }
         if(this.registered.status=="203"){
            this.notice.error("Vos identifiants sont incorrects", "Connexion au compte");
         }
         if(this.registered.status=="200"){
          this.notice.success("Connexion réussie!", "Connexion au compte");
          this.user = {
            password : "",
            email : ""
          };
          //localStorage.setItem('user', JSON.stringify(this.registered.data.user));
          localStorage.setItem('user', JSON.stringify(this.registered.data));
          this.tools.go("index");
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
