import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

@Injectable()
export class MqttProvider {

  private topic:string = "/world"

  constructor(private mqttService:MqttService) {
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
