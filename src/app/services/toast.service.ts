import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastrService: ToastrService,
  ) { }

  success(message : any, title : any) {
    this.toastrService.success(message, title, {
      progressBar: true,
      closeButton: true,
    })
  }

  
  error(message : any, title : any) {
    this.toastrService.error(message, title, {
      progressBar: true,
      closeButton: true,
    })
  }

  warning(message : any, title : any) {
    this.toastrService.warning(message, title, {
      progressBar: true,
      closeButton: true,
    })
  }


}
