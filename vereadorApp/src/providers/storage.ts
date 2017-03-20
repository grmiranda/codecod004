import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Usuario } from '../model/user';
import { FacebookService } from './facebook-service';
import { GooglePlusService } from './google-plus-service';
import { Storage } from '@ionic/storage';


@Injectable()
export class StorageService {

  constructor(private fb: FacebookService, private gp: GooglePlusService, public storage: Storage) {
    //console.log('Hello Storage Provider');
  }

  public set(user: Usuario) {

    this.storage.set('usuarioAtual', user)
      .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error));

  }

  public get(): Promise<Usuario> {

    return this.storage.get('usuarioAtual')
      .then(
      data => data,
      error => {
        return new Usuario();
      }).catch(() => new Usuario());

  }

  public deslogar() {
    this.fb.logoutFb();
    this.gp.logoutGoogle();
    return this.storage.remove('usuarioAtual').then(response => { alert("deslogado com sucesso") });
  }

}
