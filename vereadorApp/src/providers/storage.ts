import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { NativeStorage } from 'ionic-native';
import { Usuario } from '../model/user';
import { FacebookService } from './facebook-service';
import { GooglePlusService } from './google-plus-service';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Storage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StorageService {

  constructor(private fb : FacebookService, private gp : GooglePlusService, public storage: Storage) {
    console.log('Hello Storage Provider');
  }

  set(user: Usuario) {

    this.storage.set('usuarioAtual', user)
      .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error));

  }

  get(): Promise<Usuario> {

    return this.storage.get('usuarioAtual')
  .then(
    data => data,
    error => {
      return new Usuario();
    });

  }

  deslogar() {
    this.fb.logoutFb();
    this.gp.logoutGoogle();
    return NativeStorage.remove('usuarioAtual').then(response => {alert("deslogado com sucesso")});
  }




}
