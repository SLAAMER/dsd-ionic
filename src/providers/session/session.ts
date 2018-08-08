import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SessionProvider {

  private postAPI: string = 'https://dsd-api.herokuapp.com/api/user/login';
  token:string = "";

  constructor(private http: HttpClient, private storage: Storage) {

  }

  auth(email: string, password: string): Promise<any> {
    let body = {
      'email': email,
      'password': password
    };
    return this.http.post(this.postAPI, body).toPromise();
  }

  getSession(): Promise<any> {
    return this.storage.get('session');
  }

  saveSession(email: string, token: string) {
    let session = {
      'email':email,
      'token':token
    }
    return this.storage.set('session', session);
  }

  endSession() {
    return this.storage.remove('session');
  }

}
