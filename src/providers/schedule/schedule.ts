import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import isWithinRange from 'date-fns/is_within_range';

@Injectable()
export class ScheduleProvider {
  
  public Rush:0;
  public Normal:1;
  public Slow:2;

  private currentType:number;

  constructor(private http: HttpClient) {
  }

  getCurrentType():number{
    var currentDate = new Date();
    //new Date(year, month, day, hours, minutes, seconds, milliseconds)
    var morningRushStartTime = new Date(currentDate) //8:00 am  8, 0, 0, 0
    morningRushStartTime.setHours(8)
    morningRushStartTime.setMinutes(0)
    morningRushStartTime.setSeconds(0)
    var morningRushEndTime = new Date(currentDate) //10:59:59  10, 59, 59, 0
    morningRushEndTime.setHours(10)
    morningRushEndTime.setMinutes(59)
    morningRushEndTime.setSeconds(59)

    var middayNormalStartTime = new Date(currentDate) //11:00  11, 0, 0, 0
    middayNormalStartTime.setHours(11)
    middayNormalStartTime.setMinutes(0)
    middayNormalStartTime.setSeconds(0)
    var middayNormalEndTime = new Date(currentDate) //2:59:59   14, 59, 59, 0
    middayNormalEndTime.setHours(14)
    middayNormalEndTime.setMinutes(59)
    middayNormalEndTime.setSeconds(59)

    var afternoonRushStartTime = new Date(currentDate) //3:00  15, 0, 0, 0
    afternoonRushStartTime.setHours(15)
    afternoonRushStartTime.setMinutes(0)
    afternoonRushStartTime.setSeconds(0)
    var afternoonRushEndTime = new Date(currentDate) //4:59:59  16, 59, 59, 0
    afternoonRushEndTime.setHours(16)
    afternoonRushEndTime.setMinutes(59)
    afternoonRushEndTime.setSeconds(59)

    var afternoonNormalStartTime = new Date(currentDate) //5:00  17, 0, 0, 0
    afternoonNormalStartTime.setHours(17)
    afternoonNormalStartTime.setMinutes(0)
    afternoonNormalStartTime.setSeconds(0)
    var afternoonNormalEndTime = new Date(currentDate) //8:29:59  20, 29, 59, 0
    afternoonNormalEndTime.setHours(20)
    afternoonNormalEndTime.setMinutes(29)
    afternoonNormalEndTime.setSeconds(59)
    
    var slowStartTime = new Date(currentDate) //8:30  20, 30, 0, 0
    slowStartTime.setHours(20)
    slowStartTime.setMinutes(30)
    slowStartTime.setSeconds(0)
    var slowEndTime = new Date(currentDate) //8:30  7, 59, 59, 0
    slowEndTime.setHours(7)
    slowEndTime.setMinutes(59)
    slowEndTime.setSeconds(59)

    var tempTime = new Date(currentDate);
    tempTime.setHours(0);
    tempTime.setMinutes(0);
    tempTime.setSeconds(0);

    var tempTime2 = new Date(currentDate);
    tempTime2.setHours(7);
    tempTime2.setMinutes(59);
    tempTime2.setSeconds(59);

    if(isWithinRange(currentDate, tempTime, tempTime2)){
        slowStartTime.setDate(slowStartTime.getDate()-1);
    }
    else{
        slowEndTime.setDate(slowEndTime.getDate()+1);
    }
    

    if(isWithinRange(currentDate, morningRushStartTime, morningRushEndTime)){
        //console.log('morning rush')
        //Lower cooldown, more uses
        this.currentType = 0;
    }
    else if(isWithinRange(currentDate, middayNormalStartTime, middayNormalEndTime)){
        //console.log('normal midday')
        //Mid cooldown, normal uses
        this.currentType = 1;
    }
    else if(isWithinRange(currentDate, afternoonRushStartTime, afternoonRushEndTime)){
        //console.log('afternoon rush')
        //Lower cooldown, more uses
        this.currentType = 0;
    }
    else if(isWithinRange(currentDate, afternoonNormalStartTime, afternoonNormalEndTime)){
        //console.log('normal afternoon')
        //Mid cooldown, normal uses
        this.currentType = 1;
    } //currentDate.getTime() >= slowStartTime.getTime() && currentDate.getTime() >= slowEndTime.getTime()
    else if(isWithinRange(currentDate, slowStartTime, slowEndTime)){
        //console.log('slow time')
        //High cooldown, lower uses
        this.currentType = 2;
    }

    return this.currentType;
  }

}
