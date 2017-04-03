import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Usuario } from '../model/user';
import { FacebookService } from './facebook-service';
import { GooglePlusService } from './google-plus-service';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { PushService } from './push-service';


@Injectable()
export class StorageService {

  constructor( public events: Events, private fb : FacebookService, private gp : GooglePlusService, public storage: Storage, private psService: PushService) {
    console.log('Hello Storage Provider');
  }

  public set(user: Usuario) {

    this.events.publish('user:changed', user);
    this.storage.set('usuarioAtual', user)
      .then(
      () => {
        this.events.publish('user:changed', user);
      },
      error => alert('Erro ao carregar dados')
      );

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
    this.psService.removeTag("adm");
    return this.storage.remove('usuarioAtual').then(response => { alert("deslogado com sucesso") });
  }

}
