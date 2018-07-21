import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScheduleProvider } from '../schedule/schedule';
import { ToastProvider } from '../toast/toast';
import { Toast } from 'ionic-angular';

@Injectable()
export class CooldownProvider {

  public coolDownStatus:boolean = false;
  private coolDownDuration:number = NaN;
  private coolDownMinimumDuration:number;
  private coolDownMaximumDuration:number;
  private toast:Toast;

  constructor(public http: HttpClient, private scheduleProvider: ScheduleProvider, private toastPrvd: ToastProvider) {
    this.subtractLoop();
  }

  private getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  public substractCoolDownDuration(){
    if(this.coolDownStatus){
        if(this.coolDownDuration > 0){
            this.coolDownDuration = this.coolDownDuration - 1;
            if(this.toast) this.toast.setMessage('Cool down: ' + this.coolDownDuration + ' seconds remaining');
        }
        else{
            this.coolDownStatus = false;
        }
    }
  }

  public startCooldown(){
    this.coolDownStatus = true;
    this.coolDownMinimumDuration = 0;
    this.coolDownMaximumDuration = 0;
    //0 = rush, 1 = normal, 2 = slow
    switch(this.scheduleProvider.getCurrentType()){
        case this.scheduleProvider.Rush:
            this.coolDownMinimumDuration = 5;
            this.coolDownMaximumDuration = 15;
        break;
        case this.scheduleProvider.Normal:
            this.coolDownMinimumDuration = 20;
            this.coolDownMaximumDuration = 30;
        break;
        case this.scheduleProvider.Slow:
            this.coolDownMinimumDuration = 60;
            this.coolDownMaximumDuration = 120;
        break;
        default:
            this.coolDownMinimumDuration = 60;
            this.coolDownMaximumDuration = 120;
        break;
    }
    this.coolDownDuration = this.getRndInteger(this.coolDownMinimumDuration, this.coolDownMaximumDuration); //# of seconds for cooldown
    this.presentToast('Cool down: ' + this.coolDownDuration + ' seconds remaining', this.coolDownDuration);
  }

  private subtractLoop(){
      setInterval(()=>{
          this.substractCoolDownDuration();
      },1000);
  }

  private presentToast(message:string, duration:number){
      this.toast = this.toastPrvd.presentToast(message, duration);
  }

}
