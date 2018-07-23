import { Injectable } from '@angular/core';
import { ScheduleProvider } from '../schedule/schedule';
import { ToastProvider } from '../toast/toast';
import { Toast } from 'ionic-angular';

@Injectable()
export class CooldownProvider {

  public coolDownStatus:boolean = false;
  public coolDownDuration:number = 0;
  private coolDownRange:{ lower:number, upper:number} = {
    lower:0,
    upper:0
  };
  private toast:Toast;

  constructor(private scheduleProvider: ScheduleProvider, private toastPrvd: ToastProvider) {
    this.subtractLoop();
    this.assignSchedule();
  }

  private getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  private substractCoolDownDuration(){
    if(this.coolDownStatus){
        if(this.coolDownDuration > 0){
            this.coolDownDuration--;
            if(this.toast) this.toast.setMessage('Cool down: ' + this.coolDownDuration + ' seconds remaining');
        }
        else{
            this.coolDownStatus = false;
        }
    }
  }

  public startCooldown(){
    this.coolDownStatus = true;
    this.coolDownDuration = this.getRndInteger(this.coolDownRange.lower, this.coolDownRange.upper); //# of seconds for cooldown
    this.presentToast('Cool down: ' + this.coolDownDuration + ' seconds remaining', this.coolDownDuration);
  }

  private assignSchedule(){
    //0 = rush, 1 = normal, 2 = slow
    switch(this.scheduleProvider.getCurrentType()){
        case this.scheduleProvider.Rush:
            this.coolDownRange.lower = 5;
            this.coolDownRange.upper = 15;
        break;
        case this.scheduleProvider.Normal:
            this.coolDownRange.lower = 20;
            this.coolDownRange.upper = 40;
        break;
        case this.scheduleProvider.Slow:
            this.coolDownRange.lower = 60;
            this.coolDownRange.upper = 120;
        break;
    }
  }

  private subtractLoop(){
      setInterval(()=>{
          this.substractCoolDownDuration();
      },1000);
  }

  private presentToast(message:string, duration:number){
      this.toast = this.toastPrvd.presentToast(message, duration);
  }

  //Modifiers
  reset(){
      this.coolDownDuration = 0;
      if(this.toast)this.toast.dismiss();
  }

}
