
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse,HttpEvent, HttpParams, HttpRequest, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  connect : boolean = false;
  user = JSON.parse(localStorage.getItem('user') || '{}');
  domain_url = environment.dmaineUrl;
  public loading = false;
  httpHeader = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'*',
      'Accept': 'application/json, text/plain',
      'Access-Control-Allow-Credentials': 'true',
    })
  };

  



  constructor(
    private http: HttpClient,
    private router : Router,
    
    
    ) {     }



  samplePost(url: string, data:any, ){
    let ll = environment.url+url;
    console.log(ll, data, this.httpHeader);
    return  this.http.post(ll, data, this.httpHeader);
  }

  //Get data
  getDataAuth(url: string){
  const headers = new HttpHeaders({
    'Authorization': 'Bearer '+this.user.token
  });
  let ll =environment.url+url;
  return this.http.get(ll,{'headers':headers}).pipe( 
    retry(2),
    catchError(this.handleError)
  );
}

//Get data
postDataAuth(url: string, data: any){
  const headers = new HttpHeaders({
    'Authorization': 'Bearer '+this.user.token
      });
    let ll =environment.url+url;
   console.log(ll, data, {'headers':headers});
    return this.http.post(ll, data, {'headers':headers}).pipe( 
      retry(2),
      catchError(this.handleError)
    );
  }

  //Get data
getDataSample(url: string){
  const headers = new HttpHeaders({
   // 'Authorization': 'Bearer '+this.user.token
  });
  let ll =environment.url+url;
  return this.http.get(ll,{'headers':headers}).pipe( 
    retry(2),
    catchError(this.handleError)
  );
  }






  register(data:any, url: string){
    let ll = environment.url+url;
    console.log(ll, data, this.httpHeader);
    return  this.http.post(ll, data, this.httpHeader);
  }

/*   getPDF(url, data): Observable<Blob>
     {
      let ll = environment.url+url;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json',
        responseType : 'blob'});
         return this.http.post<Blob>(ll, data, { headers : headers,responseType : 
          'blob' as 'json'});
     } */


isConnected(){
  this.connect = !this.connect
}
  



  handleError(error: HttpErrorResponse) {
    // this.load.hideLoader();
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      console.log("reeeeeeeee")
      if( this.loading == true){
        this.loading = false;
      }
     // this.notice.showError("Votre demande ne peut être éxécuté actuellement. Veuillez réessayer ultérieurement!", "Serveur non joignable")
     // this.presentToast(error.error.message);
    } else {
      console.log("reeeeeeeee2")
      if( this.loading == true){
        this.loading = false;
      }
      
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    //this.presentToast(error.status);
    // return an observable with a user-facing error message
      return throwError(
      'Something bad happened; please try again later.');
  };




//Get data
getDatas(url: string, data: any){
  const headers = new HttpHeaders({
    'Authorization': 'Bearer '+localStorage.getItem("token")
      });
    let ll =environment.url+url;
   console.log(ll, data, {'headers':headers});
    return this.http.post(ll, data, {'headers':headers}).pipe( 
      retry(2),
      catchError(this.handleError)
    );
  }




}


