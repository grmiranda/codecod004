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

  private link: string = "http://dsoutlet.com.br/apiLuiz/logar.php";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    public http: Http,
    public googleAuth: GoogleAuth,
    public user: User
  ) {
    console.log('Hello GooglePlusService Provider');
  }

  public loginGoogle(push): Promise<any> {
    return this.googleAuth.login().then(sucess => this.api(this.user.social.google.uid, push))
    .catch(() => alert("Erro ao se conectar com o google plus"));
  }
  private api(token, push):Promise<any>{
    return this.http.post(this.link, JSON.stringify({token , push: push}), { headers: this.headers }).toPromise().then(res => res = res.json()).
    catch(() => alert("Erro ao se conectar com o servidor"));
  }

  public getDados(): Usuario {
    let usuario = new Usuario();
    usuario.nome = this.user.social.google.data.full_name;
    usuario.fotoURL = this.user.social.google.data.profile_picture;
    usuario.socialID = this.user.social.google.uid;
    usuario.email = this.user.social.google.data.email;
    return usuario;

  }


  public logoutGoogle() {
    alert("Deslogado com sucesso");
    this.googleAuth.logout();
  }

}
