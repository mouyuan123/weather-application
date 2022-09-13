import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorSuccessMessageService {

  constructor(private toast: ToastrService) { }

  /**
   * 
   * @param text to be displayed when the event is successful
   */
  showSuccess(text: string): void{
    let title =  'Success:'
    let contents = text;
    this.toast.success(contents, title,{
      positionClass:'toast-top-full-width'
    });
    this.toast.toastrConfig.preventDuplicates = true;
  }

   /**
   * 
   * @param text to be displayed when the event is failed
   */
    showFailure(text: string): void{
      let title =  'An error occured: ';
      let contents = text;
      this.toast.error(contents, title,{
        positionClass:'toast-top-full-width'
      });
      this.toast.toastrConfig.preventDuplicates = true;
    }
}
