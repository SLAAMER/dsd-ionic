import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionProvider } from '../session/session';

@Injectable()
export class DispensersProvider {

  private api: string = "https://dsd-api.herokuapp.com/api/dispenser/";
  private kitMod: string = "?kits=1";

  private dispenseAPI: string = "https://dsd-api.herokuapp.com/api/dispenser/dispense/kit";

  constructor(private http: HttpClient, private session: SessionProvider) {

  }

  dispenser(): string {
    return "5b67c60be458c21b124a1882";
  }

  dispense(dispenserId, kitId, token?): Promise<any> {
    var options = {};
    if(token){
      options = {
        headers: new HttpHeaders({
          'Authorization':token
        })
      };

    }
    else{
      options = {
        headers: new HttpHeaders({
          'Authorization':this.session.token
        })
      };
    }
    let body = {
      'dispenser':dispenserId,
      'kit': kitId
    };
    console.log(options);
    
    return this.http.post(this.dispenseAPI,body,options).toPromise();
  }

  getUsers() {
    let op = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.get("https://dsd-api.herokuapp.com/api/simulator/bots-army", op).toPromise();
  }

  getStaticDispenser():Promise<any>{
    return this.http.get('https://dsd-api.herokuapp.com/api/dispenser/search?name=UTT - Vinculación - Enfermería').toPromise();
  }

  getDispenser(id: string): Promise<any> {
    return this.http.get(this.api + id + this.kitMod).toPromise();
  }

  getDispensers() {
    return this.http.get(this.api + this.kitMod).toPromise();
  }

}
