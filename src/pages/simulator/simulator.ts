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
    this.style();
  }

  ionViewDidLoad(){
    this.simulatorLoop();
  }

  ionViewWillLeave(){
    this.simulatorStatus = false; //IF IT'S ON WHEN LEAVES, SIMULATOR NEVES STOPS XC
  }

  style(){
    document.getElementById('output').style.maxHeight = document.getElementById('main').style.height;
  }
  
  private getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  /*private weekDay(){
    var weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var current = new Date().getDay();
    return weekDays[current];
  }*/

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
          var chosenKit = [];
          var chosenUser = [];
          let numOfDispensers = this.getRndInteger(1, this.dispensers.length); //# of dispensers that will generate a use

          for(let i = 0; i < numOfDispensers; i++){ //for each dispenser
              let d = this.getRndInteger(1,100); //find which one
              for(let x = 0; x < this.dispensers.length; x++){ //checks out the dispensers' probability
                  if(d <= this.dispensers[x].probability){ //if the chosen dispenser is within a dispenser probability range
                      chosenDispensers.push(this.dispensers[x]); //then add it to our aux array
                      d = 101; //removes it by going over the limit of 100% probability
                  }
              } 
          }
          chosenDispensers.forEach(element => {
              let k = this.getRndInteger(1,100);
              let u = this.getRndInteger(1,100);

              element.kits.forEach(kit =>{
                  if(k <= kit.probability){
                      chosenKit.push(kit);
                      k = 101; 
                  }
              });
              element.users.forEach(user =>{
                  if(u <= user.probability){
                      chosenUser.push(user);
                      u = 101; 
                  }
              });
          });

          for(let i = 0; i < chosenDispensers.length; i++){
            let obj = {
              "dispenserId" : chosenDispensers[i].dispenserId,
              "kitId" : chosenKit[i].kitId,
              "userId" : chosenUser[i].userId
            }
            this.allResults.push(obj);
          }
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
