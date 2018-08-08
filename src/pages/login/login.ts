import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events, LoadingController } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private email:string;
  private password:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, 
    private session: SessionProvider, private event: Events, private toast: ToastProvider, private loadingCtrl: LoadingController) {
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave(){
    this.menuCtrl.enable(true);
  }

  validate(){
    if(this.credentialsNotNull()){
      let loader = this.loadingCtrl.create({spinner:'crescent'});
      loader.present().then(()=>{
        this.session.auth(this.email, this.password).then((res)=>{
          this.session.token = res.token;
          this.session.saveSession(this.email, res.token).then(()=>{
            this.event.publish('session', this.email);
            this.goHome(loader);
          }).catch((ex)=>{
            console.log(ex);
            loader.dismiss();
            this.toast.presentToast("Login failure");
          });
        }).catch((ex)=>{
          loader.dismiss();
          this.toast.presentToast(ex.error.email || ex.error.password || "Network failure");
        });
      });
      
    }
  }

  credentialsNotNull(){
    if(!this.email || !this.password) return false;
    else return true;
  }

  goHome(loader){
    loader.dismiss();
    this.navCtrl.setRoot('HomePage');
    this.event.publish('highlight');
  }

}
