import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private email:string;
  private password:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl:MenuController) {
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave(){
    this.menuCtrl.enable(true);
  }

  validate(){
    //TODO
    this.goHome();
  }

  goHome(){
    this.navCtrl.setRoot('HomePage');
  }

}
