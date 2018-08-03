import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private email:string;
  private password:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private session: SessionProvider, private event: Events) {
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave(){
    this.menuCtrl.enable(true);
  }

  validate(){
    /*if(this.credentialsNotNull()){
      this.session.auth(this.email, this.password).then((res)=>{
        this.session.saveSession(res.email).then(()=>{
          this.event.publish('session', res.email);
          this.goHome();
        });
      });
    }*/
    if(this.credentialsNotNull()){
      this.session.saveSession(this.email).then(()=>{
        this.event.publish('session', this.email);
        this.goHome();
      });
    }
  }

  credentialsNotNull(){
    if(!this.email || !this.password) return false;
    else return true;
  }

  goHome(){
    this.navCtrl.setRoot('HomePage');
    this.event.publish('highlight');
  }

}
