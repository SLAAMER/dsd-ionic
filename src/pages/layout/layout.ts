import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DispensersProvider } from '../../providers/dispensers/dispensers';

@IonicPage()
@Component({
  selector: 'page-layout',
  templateUrl: 'layout.html',
})
export class LayoutPage {

  message: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private modalCtrl: ModalController, private dispenser:DispensersProvider) {
  }

  openModal() {
    this.modalCtrl.create('ControlPage', { id: this.dispenser.dispenser() }).present();
  }

}
