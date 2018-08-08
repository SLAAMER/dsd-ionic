import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SessionProvider } from '../providers/session/session';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  activePage: any;
  pages: Array<{title: string, component: string, icon?:string}>;

  email:string;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private event: Events, private session: SessionProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage', icon:'pie' },
      { title: 'Simulator', component: 'SimulatorPage', icon:'medkit' },
      { title: 'Layout', component: 'LayoutPage', icon:'easel' }
    ];

    this.activePage = this.pages[0];

    this.event.subscribe('highlight', ()=>{
      this.activePage = this.pages[0];
    });

    this.event.subscribe('session', (session)=>{
      console.log(session)
      this.email = session.email;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      this.statusBar.styleDefault();
      this.session.getSession().then((session)=>{
        if(session){
          this.email = session.email;
          this.rootPage = "HomePage";
        }
        else{
          this.rootPage = "LoginPage";
        }
      });
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.activePage = page;
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  checkActivePage(page){
    return page == this.activePage;
  }

  logout(){
    this.session.endSession().then(()=>{
      this.nav.setRoot('LoginPage');
    });
  }
}
