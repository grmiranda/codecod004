import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Publicacao } from '../model/publicacao';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Component } from '@angular/core';
import { FacebookAuth, User } from '@ionic/cloud-angular';
import { Usuario } from '../model/user';


@Injectable()
export class FacebookService {

  private link: string = "http://dsoutlet.com.br/apiLuiz/logar.php";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http, public facebookAuth: FacebookAuth, public user: User) {
  }

  public loginFacebook(): Promise<any> {
    return this.facebookAuth.login().then(sucess => this.api(this.user.social.google.uid))
      .catch(() => alert("Erro ao se conectar com o facebook"));
  }
  private api(token): Promise<any> {
    return this.http.post(this.link, JSON.stringify(token), { headers: this.headers }).toPromise().then(res => res = res.json()).
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
    this.facebookAuth.logout();
  }


}
