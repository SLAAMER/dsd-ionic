import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DispensersProvider } from '../../providers/dispensers/dispensers';
import isWithinRange from 'date-fns/is_within_range'

@IonicPage()
@Component({
  selector: 'page-simulator',
  templateUrl: 'simulator.html',
})
export class SimulatorPage {

  private emergencyDuration:number;
  private emergencyStatus:boolean = false;
  private coolDownDuration:number;
  private coolDownStatus:boolean = false;
  private coolDownMinimumDuration:number;
  private coolDownMaximumDuration:number;
  private coolDownType = 0;
  private Schedule = {
    Rush:0,
    Normal:1,
    Slow:2
  };

  private simulatorStatus:boolean = false;
  private result = {};

  private dispensers:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dispProvider: DispensersProvider) {
  }

  ionViewDidEnter() {
    this.dispensers = this.dispProvider.getDispensers();
    console.log(this.dispensers)
  }

  ionViewDidLoad(){
    this.simulatorLoop();
  }

  private switchState(){
    this.simulatorStatus = !this.simulatorStatus;
  }
  
  private getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  private weekDay(){
    var weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var current = new Date().getDay();
    return weekDays[current];
  }

  private substractEmergencyDuration(){
    if(this.emergencyStatus){
        if(this.emergencyDuration > 0){
            this.emergencyDuration = this.emergencyDuration - 1;
        }
        else{
            this.emergencyStatus = false;
        }
    }
  }

  private substractCoolDownDuration(){
    if(this.coolDownStatus){
        if(this.coolDownDuration > 0){
            this.coolDownDuration = this.coolDownDuration - 1;
        }
        else{
            this.coolDownStatus = false;
        }
    }
  }

  private startCooldown(){
    this.coolDownStatus = true;
    this.coolDownMinimumDuration = 0;
    this.coolDownMaximumDuration = 0;
    //0 = rush, 1 = normal, 2 = slow
    switch(this.coolDownType){
        case this.Schedule.Rush:
            this.coolDownMinimumDuration = 5;
            this.coolDownMaximumDuration = 15;
        break;
        case this.Schedule.Normal:
            this.coolDownMinimumDuration = 20;
            this.coolDownMaximumDuration = 30;
        break;
        case this.Schedule.Slow:
            this.coolDownMinimumDuration = 60;
            this.coolDownMaximumDuration = 120;
        break;
        default:
            this.coolDownMinimumDuration = 60;
            this.coolDownMaximumDuration = 120;
        break;
    }
    this.coolDownDuration = this.getRndInteger(this.coolDownMinimumDuration, this.coolDownMaximumDuration); //# of seconds for cooldown
  }

  private simulatorLoop(){
    setInterval(()=>{
      if(this.simulatorStatus){
        var currentDate = new Date();
        //new Date(year, month, day, hours, minutes, seconds, milliseconds)
        var morningRushStartTime = new Date(currentDate) //8:00 am  8, 0, 0, 0
        morningRushStartTime.setHours(8)
        morningRushStartTime.setMinutes(0)
        morningRushStartTime.setSeconds(0)
        var morningRushEndTime = new Date(currentDate) //10:59:59  10, 59, 59, 0
        morningRushEndTime.setHours(10)
        morningRushEndTime.setMinutes(59)
        morningRushEndTime.setSeconds(59)

        var middayNormalStartTime = new Date(currentDate) //11:00  11, 0, 0, 0
        middayNormalStartTime.setHours(11)
        middayNormalStartTime.setMinutes(0)
        middayNormalStartTime.setSeconds(0)
        var middayNormalEndTime = new Date(currentDate) //2:59:59   14, 59, 59, 0
        middayNormalEndTime.setHours(14)
        middayNormalEndTime.setMinutes(59)
        middayNormalEndTime.setSeconds(59)

        var afternoonRushStartTime = new Date(currentDate) //3:00  15, 0, 0, 0
        afternoonRushStartTime.setHours(15)
        afternoonRushStartTime.setMinutes(0)
        afternoonRushStartTime.setSeconds(0)
        var afternoonRushEndTime = new Date(currentDate) //4:59:59  16, 59, 59, 0
        afternoonRushEndTime.setHours(16)
        afternoonRushEndTime.setMinutes(59)
        afternoonRushEndTime.setSeconds(59)

        var afternoonNormalStartTime = new Date(currentDate) //5:00  17, 0, 0, 0
        afternoonNormalStartTime.setHours(17)
        afternoonNormalStartTime.setMinutes(0)
        afternoonNormalStartTime.setSeconds(0)
        var afternoonNormalEndTime = new Date(currentDate) //8:29:59  20, 29, 59, 0
        afternoonNormalEndTime.setHours(20)
        afternoonNormalEndTime.setMinutes(29)
        afternoonNormalEndTime.setSeconds(59)
        
        var slowStartTime = new Date(currentDate) //8:30  20, 30, 0, 0
        slowStartTime.setHours(20)
        slowStartTime.setMinutes(30)
        slowStartTime.setSeconds(0)
        var slowEndTime = new Date(currentDate) //8:30  7, 59, 59, 0
        slowEndTime.setHours(7)
        slowEndTime.setMinutes(59)
        slowEndTime.setSeconds(59)

        var tempTime = new Date(currentDate);
        tempTime.setHours(0);
        tempTime.setMinutes(0);
        tempTime.setSeconds(0);

        var tempTime2 = new Date(currentDate);
        tempTime2.setHours(7);
        tempTime2.setMinutes(59);
        tempTime2.setSeconds(59);

        if(isWithinRange(currentDate, tempTime, tempTime2)){
            slowStartTime.setDate(slowStartTime.getDate()-1);
        }
        else{
            slowEndTime.setDate(slowEndTime.getDate()+1);
        }
        

        if(isWithinRange(currentDate, morningRushStartTime, morningRushEndTime)){
            //console.log('morning rush')
            //Lower cooldown, more uses
            this.coolDownType = 0;
        }
        else if(isWithinRange(currentDate, middayNormalStartTime, middayNormalEndTime)){
            console.log('normal midday')
            //Mid cooldown, normal uses
            this.coolDownType = 1;
        }
        else if(isWithinRange(currentDate, afternoonRushStartTime, afternoonRushEndTime)){
            //console.log('afternoon rush')
            //Lower cooldown, more uses
            this.coolDownType = 0;
        }
        else if(isWithinRange(currentDate, afternoonNormalStartTime, afternoonNormalEndTime)){
            //console.log('normal afternoon')
            //Mid cooldown, normal uses
            this.coolDownType = 1;
        } //currentDate.getTime() >= slowStartTime.getTime() && currentDate.getTime() >= slowEndTime.getTime()
        else if(isWithinRange(currentDate, slowStartTime, slowEndTime)){
            console.log('slow time')
            //High cooldown, lower uses
            this.coolDownType = 2;
        }

        if(!this.coolDownStatus){
          let usesArray = [];
          let numOfDispensers = this.getRndInteger(1, this.dispensers.length); //# of dispensers that will generate a use
          for(let i = 0; i < numOfDispensers; i++){ //for each dispenser
              let d = this.getRndInteger(1,100); //find which one
              for(let x = 0; x < this.dispensers.length; x++){ //checks out the this.pPriority
                  if(d <= this.dispensers[x].priority){ //if the chosen dispenser is within a dispPriority range
                      usesArray.push(this.dispensers[x]); //then add it to our aux array
                      d = 101; //removes it by going over the limit of 100% priority
                  }
              } 
          }
          console.log(usesArray);
          this.result['dispensers'] = usesArray;
          var chosenKit = [];
          var chosenUser = [];
          usesArray.forEach(element => {
              let k = this.getRndInteger(1,100);
              let u = this.getRndInteger(1,100);

              element.kits.forEach(kit =>{
                  if(k <= kit.priority){
                      chosenKit.push(kit);
                      k = 101; 
                  }
              });

              element.users.forEach(user =>{
                  if(u <= user.priority){
                      chosenUser.push(user);
                      u = 101; 
                  }
              });
          });

          
          this.result['kits'] = chosenKit;
          this.result['users'] = chosenUser;

          this.startCooldown();
          console.log(this.result)
        }

        this.substractEmergencyDuration();
        this.substractCoolDownDuration();
        console.log(this.coolDownDuration);
      }
    }, 1000)
  }

}
