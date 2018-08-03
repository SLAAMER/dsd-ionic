import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SessionProvider {

  private postAPI: string = '';

  constructor(private http: HttpClient, private storage: Storage) {

  }

  auth(email: string, password: string): Promise<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        '':''
      })
    };
    let body = {
      'email':email,
      'password':password
    };
    return this.http.post(this.postAPI, body, httpOptions).toPromise();
  }

  getSession(): Promise<any> {
    return this.storage.get('session');
  }

  saveSession(email: string) {
    return this.storage.set('session', email);
  }

  endSession() {
    return this.storage.remove('session');
  }

}
