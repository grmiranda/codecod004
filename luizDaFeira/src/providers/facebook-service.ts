import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Facebook } from 'ionic-native';



/*
  Generated class for the FacebookService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FacebookService {

  constructor(public http: Http) {
    Facebook.browserInit(1369381413123566, "v2.8");
  }

  doFbLogin(): Promise<any> {

    return Facebook.login(["public_profile"])
      .then(function (response) {
        this.apiFacebook(response);
    }).catch(error => {
      alert("Erro ao se logar no facebook");
    })
  }

  apiFacebook(response, type): Promise<any> {
    let userID = response.authResponse.userID;
    return Facebook.api('/' + response.authResponse.userID + '?fields=id,name,gender,email,picture', []).then(result =>{
      result;
    });
  }

}
