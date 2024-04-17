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
  selector: 'app-resend',
  templateUrl: './resend.component.html',
  styleUrls: ['./resend.component.css']
})
export class ResendComponent implements OnInit {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  public primaryColour = SecondaryBlue;
  public secondaryColour = PrimaryRed;
  public coloursEnabled = false;


  email : any ='';
  registered : any = {};

  constructor(
    private notice : ToastService,
    private tools: ToolsService,
    private api : ApiService,
  )
  {
   
  }


    
  ngOnInit(): void {
      this.email = localStorage.getItem('email');
  }

  send(){
    this.loading = true;
    let user = {
      email : this.email
    }
    this.api.samplePost("verify", user).subscribe(
     (res) => {
       console.log("res", res);
       this.registered = res;
       this.loading = false;
       if(this.registered.status=="200"){
        this.notice.success("Mail envoyé avec success", "Compte");
       }
       else{
        this.notice.warning("Un probleme est survenu. Veuillez contacter notre support technique au support@student2staff.com", "Compte");
       }
     },
     (err) => {
       this.loading = false;
       //...
     }
   ); 
  }

}
