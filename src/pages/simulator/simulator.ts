import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DispensersProvider } from '../../providers/dispensers/dispensers';
import { CooldownProvider } from '../../providers/cooldown/cooldown';

@IonicPage()
@Component({
  selector: 'page-simulator',
  templateUrl: 'simulator.html',
})
export class SimulatorPage {

  private emergencyDuration:number;
  private emergencyStatus:boolean = false;
  private simulatorStatus:boolean = false;
  private result = {};
  private allResults = [];
  private dispensers:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dispProvider: DispensersProvider, private coolDownProvider:CooldownProvider) {
  }

  ionViewDidEnter() {
    this.dispensers = this.dispProvider.getDispensers();
  }

  ionViewDidLoad(){
    this.simulatorLoop();
  }

  ionViewWillLeave(){
    this.simulatorStatus = false; //IF IT'S ON WHEN LEAVES, SIMULATOR NEVES STOPS XC
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
            this.emergencyDuration--;
        }
        else{
            this.emergencyStatus = false;
        }
    }
  }

  private simulatorLoop(){
    setInterval(()=>{
      if(this.simulatorStatus){
        if(!this.coolDownProvider.coolDownStatus){
          let chosenDispensers = [];
          let numOfDispensers = this.getRndInteger(1, this.dispensers.length); //# of dispensers that will generate a use
          for(let i = 0; i < numOfDispensers; i++){ //for each dispenser
              let d = this.getRndInteger(1,100); //find which one
              for(let x = 0; x < this.dispensers.length; x++){ //checks out the this.pPriority
                  if(d <= this.dispensers[x].priority){ //if the chosen dispenser is within a dispPriority range
                      chosenDispensers.push(this.dispensers[x]); //then add it to our aux array
                      d = 101; //removes it by going over the limit of 100% priority
                  }
              } 
          }
          var chosenKit = [];
          var chosenUser = [];
          chosenDispensers.forEach(element => {
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

          
          
          this.result['dispensers'] = chosenDispensers;
          this.result['kits'] = chosenKit;
          this.result['users'] = chosenUser;
          this.allResults.push(this.result);
          console.log(this.allResults)
          this.coolDownProvider.startCooldown();
        }

        this.substractEmergencyDuration();
      }
    }, 1000)
  }

  //Methods to Modify Simulator
  resetCoolDown(){
      this.coolDownProvider.reset();
  }

}
