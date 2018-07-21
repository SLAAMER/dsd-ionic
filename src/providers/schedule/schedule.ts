import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ScheduleProvider {
  
  private Rush:0
  private Normal:1
  private Slow:2

  constructor(public http: HttpClient) {
  }

  getScheduleState(){
    
  }

}
