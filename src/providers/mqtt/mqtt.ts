import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService, IMqttServiceOptions } from 'ngx-mqtt';

@Injectable()
export class MqttProvider {

  private options: IMqttServiceOptions = {
    hostname: 'm13.cloudmqtt.com',
    port: 33700,
    path: '/',
    username: 'iurigkzv',
    password: 'ywgljptjPEAp',
    protocol: 'wss'
  };

  private topic:string = "/DSD/dispenser/tests";

  constructor(private mqttService:MqttService) {
    this.mqttService = new MqttService(this.options);
    this.subscribe();
  }

  private subscribe(){
    this.mqttService.observe(this.topic).subscribe((message:IMqttMessage)=>{
      console.log(message.payload.toString())
    });
  }

  publish(message:string){
    this.mqttService.unsafePublish(this.topic, message, {qos: 0, retain: false});
  }

}
