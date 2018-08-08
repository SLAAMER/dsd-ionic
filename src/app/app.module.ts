import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { MqttModule, MqttService } from 'ngx-mqtt';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DispensersProvider } from '../providers/dispensers/dispensers';
import { CooldownProvider } from '../providers/cooldown/cooldown';
import { ScheduleProvider } from '../providers/schedule/schedule';
import { ToastProvider } from '../providers/toast/toast';
import { MqttProvider } from '../providers/mqtt/mqtt';
import { SessionProvider } from '../providers/session/session';
import { SimulatorProvider } from '../providers/simulator/simulator';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    MqttModule.forRoot({
      provide: MqttService
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DispensersProvider,
    CooldownProvider,
    ScheduleProvider,
    ToastProvider,
    MqttProvider,
    SessionProvider,
    SimulatorProvider,
  ]
})
export class AppModule { }
