import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Student 2 Staff';
  user : any = JSON.parse(localStorage.getItem('user') || '{}');



  constructor(
    public router : Router,
  ) { 

  }


  ngOnInit(): void {
      console.log('user', this.user);
  }

  
  get_route(): any {
    return (this.router.url.split('?')[0]);
  }

  onActivate(event: Event) {
    window.scrollTo(0, 0);
  }
}
