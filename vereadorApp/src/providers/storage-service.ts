import { NativeStorage } from 'ionic-native';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Http } from '@angular/http';
import { Usuario } from '../model/User';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class StorageService {


  constructor(public http: Http, public events: Events) {
  }

  set(user: Usuario) {
    this.events.publish('user:changed', user);
    NativeStorage.setItem('usuarioAtual', user)
      .then(
      () => {
        this.events.publish('user:changed', user);
      },
      error => alert('Erro ao carregar dados')
      );
  }

  get(): Promise<Usuario> {
    return NativeStorage.getItem('usuarioAtual')
      .then(
      data => data,
      error => {
        return new Usuario()
      }
      );
  }

  deslogar() {
    return NativeStorage.remove('usuarioAtual').then(response => {
      console.log("deslogado");
    });
  }

}
