import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Facebook } from 'ionic-native';
import { Publicacao } from '../model/publicacao';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class FacebookService {

  private linkLogin: string = "http://dsoutlet.com.br/igrejaApi/loginFace.php";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
    //id do aplicativo: 1297281393651334
    Facebook.browserInit(1297281393651334, "v2.8");
  }

  logar(): Promise<any> {
    return Facebook.login(["public_profile","email"]).then(response =>
      this.api(response, "logar")).catch(this.erro);
  }

  erro() {
    alert("erro ao tentar se conectar com o servidor");
  }

  api(response, type): Promise<any> {
    let userID = response.authResponse.userID;
    return Facebook.api('/' + response.authResponse.userID + '?fields=id,name,gender,email,picture', []).then(result => result).catch(()=>alert("erro api"));
  }


  status(): Promise<any> {
    return Facebook.getLoginStatus().then(response => response.status);
  }

  logout(): Promise<any> {
    return Facebook.logout().then(response => alert("deslogado com Sucesso"));
  }


}
