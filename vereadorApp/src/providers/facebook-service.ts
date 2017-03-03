import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Publicacao } from '../model/publicacao';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Component } from '@angular/core';
import { Usuario } from '../model/user';
import { Facebook } from 'ionic-native';


@Injectable()
export class FacebookService {

  private link: string = "http://dsoutlet.com.br/apiLuiz/logar.php";
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private id: string = "";

  constructor(public http: Http) {
    //id do aplicativo: 1865101920446266
    Facebook.browserInit(1865101920446266, "v2.8");
  }

  loginFacebook(): Promise<any> {
    return Facebook.login(["public_profile","email"]).then(res => this.http.post(this.link, JSON.stringify(res.authResponse.userID), { headers: this.headers })
    .toPromise().then(resposta=>resposta.json()).catch(()=>alert("erro ao tentar se conectar com servidor")))
    .catch(()=>alert("erro ao tentar se conectar com o face"));
  }

  public getDados(id:string): Promise<Usuario> {
    return Facebook.api('/' + id + '?fields=id,name,gender,email,picture', []).then(result => this.getDadosAux(result))
    .catch(()=>alert("erro ao tentar se conectar com api do face"));
  }

  erro() {
    alert("erro ao tentar se conectar com o servidor");
  }

  private getDadosAux(result){
    let usuario = new Usuario();
    usuario.nome = result.name;
    usuario.fotoURL = result.picture.data.url;
    usuario.socialID = result.id;
    usuario.email = result.email;
    usuario.genero = result.gender;
    return usuario;

  }

  public logoutGoogle() {
    return Facebook.logout().then(response => alert("deslogado com Sucesso"));
  }


}
