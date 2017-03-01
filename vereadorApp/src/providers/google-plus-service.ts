import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GoogleAuth, User } from '@ionic/cloud-angular';
import { Usuario } from '../model/user';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the GooglePlusService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GooglePlusService {

  private link: string = "http://dsoutlet.com.br/apiLuiz/cadastro.php";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    public http: Http,
    public googleAuth: GoogleAuth,
    public user: User
  ) {
    console.log('Hello GooglePlusService Provider');
  }

  public loginGoogle(): Promise<any> {
    return this.googleAuth.login().then(sucess => {
      alert(JSON.stringify(sucess));
      this.http.post(this.link, JSON.stringify({token: sucess.token })).toPromise().then(res => {
        res = res.json();
      }).catch(() => alert("Erro ao se conectar com o servidor"));

    }).catch(() => alert("Erro ao se conectar com o google plus"));
  }

  public getDados(): Usuario {
    let usuario = new Usuario();
    usuario.nome = this.user.social.google.data.full_name;
    usuario.fotoURL = this.user.social.google.data.profile_picture;
    usuario.socialID = this.user.social.google.uid;
    return usuario;

  }


  public logoutGoogle() {
    alert("Deslogado com sucesso");
    this.googleAuth.logout();
  }

}
