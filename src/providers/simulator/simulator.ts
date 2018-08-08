import { Injectable } from '@angular/core';

@Injectable()
export class SimulatorProvider {

  results:Array<any> = [];

  constructor() {
    
  }

  add(result){
    this.results.push(result);
  }

}
