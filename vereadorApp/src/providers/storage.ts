import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Usuario } from '../model/user';
import { FacebookService } from './facebook-service';
import { GooglePlusService } from './google-plus-service';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

/*
  Generated class for the Storage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StorageService {

  constructor( public events: Events, private fb : FacebookService, private gp : GooglePlusService, public storage: Storage) {
    console.log('Hello Storage Provider');
  }

  set(user: Usuario) {

    this.events.publish('user:changed', user);
    this.storage.set('usuarioAtual', user)
      .then(
      () => {
        this.events.publish('user:changed', user);
      },
      error => alert('Erro ao carregar dados')
      );

  }

  get(): Promise<Usuario> {

    return this.storage.get('usuarioAtual')
  .then(
    data => data,
    error => {
      return new Usuario();
    }).catch(()=>new Usuario());

  }

  deslogar() {
    this.fb.logoutFb();
    this.gp.logoutGoogle();
    return this.storage.remove('usuarioAtual').then(response => {alert("deslogado com sucesso")});
  }




}
