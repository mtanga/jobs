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
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{

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

  logout(){
    localStorage.clear();
    this.tools.go("login");
  }

}
