import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { DispensersProvider } from '../../providers/dispensers/dispensers';
import { MqttProvider } from '../../providers/mqtt/mqtt'

@IonicPage()
@Component({
  selector: 'page-control',
  templateUrl: 'control.html',
})
export class ControlPage {

  dispenser:any;

  constructor(public navParams: NavParams, public viewCtrl: ViewController, 
    private dispensersProvider: DispensersProvider, private loadingCtrl:LoadingController,
    private mqttProvider: MqttProvider, ) {
    
  }

  ionViewDidEnter() {
    this.dispensersProvider.getStaticDispenser().then((res)=>{
      console.log(res);
      
      this.dispenser = res.dispenser;
    }).catch((err)=>{
      console.log(err);
      
    });
    /*this.dispensersProvider.getDispenser(this.navParams.get('id')).then((res)=>{
      console.log(res);
      this.dispenser = res;
    }).catch((err)=>{
      console.error(err);
    });*/
  }

  dispense(dispenserId,kitId){
    let loader = this.loadingCtrl.create({spinner:'crescent'});
    loader.present().then(()=>{
      this.mqttProvider.publish(dispenserId,kitId);
    });
    setTimeout(() => {
      loader.dismiss();
    }, 2000);
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
