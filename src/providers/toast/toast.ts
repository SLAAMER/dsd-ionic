import { Injectable } from '@angular/core';
import { ToastController, Toast } from 'ionic-angular'

@Injectable()
export class ToastProvider {

  private message:string;
  private duration:number;
  private position:string;

  constructor(private toastCtrl:ToastController) {
  }

  presentToast(message?:string, duration?:number, position?:string): Toast{
    if(message) this.message = message; else this.message = '';
    if(duration) this.duration = duration * 1000; else this.duration = 3000;
    if(position) this.position = position; else this.position = 'bottom'

    let toast: Toast = this.toastCtrl.create({
      message: this.message,
      duration: this.duration,
      position: this.position,
      showCloseButton: true
    });
  
    toast.present();
    return toast;
  }

}
