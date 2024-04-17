import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {



  constructor(
    private router:Router,
    ) { }




  goTo(link: any, params: any){
    this.router.navigate([link], { queryParams: params });
  }


  go(link: any){
    this.router.navigate([link]);
  }

  checkemail(item:any)
  {
    let regex =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let email1 = item.replace("+","");
    let email = email1.replace(/\s/g, '');
    var phoneRGEX = regex;
    return phoneRGEX.test(email);
}

reloadComponent() {
  let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

  shorten(text: string, max: number) {
    return text && text.length > max ? text.slice(0,max).split(' ').slice(0, -1).join(' ') + '...' : text
}


errorConnexion(){

}


}
