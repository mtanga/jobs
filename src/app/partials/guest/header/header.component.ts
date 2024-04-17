import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, timer } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  user : any = JSON.parse(localStorage.getItem('user') || '{}');
  timerSubscription: any;
  domaineUrl : any;

  constructor(
    public router : Router,
    private api : ApiService,

  ) { 
    timer(0, 1000) //call the function immediately and every 10 seconds 
    this.timerSubscription = timer(0, 1000).pipe( 
         map(() => { 
            this.user = JSON.parse(localStorage.getItem('user') || '{}');
         }) 
      ).subscribe();
  }


  ngOnInit(): void {
    this.domaineUrl = this.api.domain_url;
    console.log("role", this.user)
  }

  

  login(){
    
    this.router.navigate(['login']);
  }

}
