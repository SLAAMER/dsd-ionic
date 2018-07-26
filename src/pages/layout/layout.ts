import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MqttProvider } from '../../providers/mqtt/mqtt'

@IonicPage()
@Component({
  selector: 'page-layout',
  templateUrl: 'layout.html',
})
export class LayoutPage {

  message:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mqttProvider: MqttProvider) {
  }

  ionViewDidLoad() {
    
  }

  publish(){
    if(this.message) this.mqttProvider.publish(this.message);
  }

}
