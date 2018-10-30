import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DispensersProvider } from '../../providers/dispensers/dispensers';
import { CooldownProvider } from '../../providers/cooldown/cooldown';
import { SimulatorProvider } from '../../providers/simulator/simulator';
import { SessionProvider } from '../../providers/session/session';
@IonicPage()
@Component({
  selector: 'page-simulator',
  templateUrl: 'simulator.html',
})
export class SimulatorPage {

  private emergencyDuration: number;
  private emergencyStatus: boolean = false;
  private simulatorStatus: boolean = false;
  private dispensers: any = [];
  private users: any = [];

  private buttonDisabled: boolean = false;
  private simulatorContent: string = "simulator";

  constructor(public navCtrl: NavController, public navParams: NavParams, private dispProvider: DispensersProvider,
    private coolDownProvider: CooldownProvider, private simulatorProvider: SimulatorProvider, private loadCtrl: LoadingController,
    private session: SessionProvider) {
  }

  ionViewDidEnter() {
    let loader = this.loadCtrl.create({ spinner: 'crescent', content: 'Getting your dispensers and users' });
    loader.present().then(() => {
      this.dispProvider.getDispensers().then((res) => {

        this.dispensers = res;
        console.log(this.dispensers);
        
        this.dispProvider.getUsers().then((res) => {
          this.users = res;
          console.log(this.users);
          
          loader.dismiss();
        }).catch((err) => {
          loader.dismiss();
        });
      }).catch((err) => {
        console.log(err);
        loader.dismiss();
      });
    });
  }

  ionViewDidLoad() {
    this.simulatorLoop();
  }

  ionViewWillLeave() {
    this.simulatorStatus = false; //IF IT'S ON WHEN LEAVES, SIMULATOR NEVES STOPS XC
  }

  private getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private substractEmergencyDuration() {
    if (this.emergencyStatus) {
      if (this.emergencyDuration > 0) {
        this.emergencyDuration--;
      }
      else {
        this.emergencyStatus = false;
      }
    }
  }

  private simulatorLoop() {
    setInterval(() => {
      if (this.simulatorStatus) {
        if (!this.coolDownProvider.coolDownStatus) {
          let chosenDispensers = [];
          var chosenKit = [];
          var chosenUser = [];
          let numOfDispensers = this.getRndInteger(1, this.dispensers.length); //# of dispensers that will generate a use
          for (let i = 0; i < numOfDispensers; i++) { //for each dispenser
            let d = this.getRndInteger(1, 100); //find which one
            for (let x = 0; x < this.dispensers.length; x++) { //checks out the dispensers' probability
              if (d <= this.dispensers[x].probability) { //if the chosen dispenser is within a dispenser probability range
                chosenDispensers.push(this.dispensers[x]); //then add it to our aux array
                d = 101; //removes it by going over the limit of 100% probability
              }
            }
          }
          chosenDispensers.forEach(element => {
            let k = this.getRndInteger(1, 99);
            let u = this.getRndInteger(1, 100);
            let prev = 0
            for (let i = 0; i < element.racks.length; i++) {
              let rack = element.racks[i];
              let kit = rack.kit;
              kit.probability = prev + 33;
              prev += 33;
              if (k <= kit.probability) {
                chosenKit.push(kit);
                k = 101;
              }
            }

            /*element.racks.forEach(rack => {
              let kit = rack.kit;
              if (k <= kit.probability) {
                chosenKit.push(kit);
                k = 101;
              }
            });*/
            this.users.forEach(user => {
              if (u <= user.probability) {
                chosenUser.push(user);
                u = 101;
              }
            });
          });
          // console.log(chosenDispensers);
          // console.log(chosenKit);
          // console.log(chosenUser);

          for (let i = 0; i < chosenDispensers.length; i++) {
            let obj = {
              "dispenserId": chosenDispensers[i]._id,
              "dispenserName": chosenDispensers[i].name,
              "kitId": chosenKit[i]._id,
              "kitName": chosenKit[i].name,
              "userId": chosenUser[i]._id,
              "userName": chosenUser[i].name,
              "userEmail": chosenUser[i].email
            }
            this.simulatorProvider.add(obj);
            //console.log(obj);
            
            this.session.auth(obj.userEmail, 'aloo123455').then((res) => {
              console.log(res);
              /**
               * DISPENSE
               */
              this.dispProvider.dispense(obj.dispenserId, obj.kitId, res.token).then((res) => {
                console.log(res);

              }).catch((err) => {
                console.log(err);

              });
            }).catch((err) => {
              console.log(err);

            });
          }
          this.coolDownProvider.startCooldown(this.emergencyStatus);
        }

        //this.substractEmergencyDuration();
      }
    }, 1000)
  }

  //Methods to Modify Simulator
  resetCoolDown() {
    this.buttonDisabled = true;
    setTimeout(() => {
      this.coolDownProvider.reset();
      this.buttonDisabled = false;
    }, 500)
  }

}
