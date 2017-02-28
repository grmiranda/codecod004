import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { User } from '../model/user';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the FirebaseService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseService {
  users: FirebaseListObservable<any>;

  constructor(public http: Http, public af: AngularFire) {
    this.users = af.database.list('/user');
  }

  public cadastrar(usuario: User) {
    this.users.push(usuario);
  }

  public buscarPeloFace(usuario: User): Promise<User> {
    const queryList = this.af.database.list('/user', {
      query: {
        orderByChild: 'fbID',
        equalTo: usuario.fbID
      }
    });
    return new Promise(resolve => {
      queryList.subscribe(queriedItems => {
        if (queriedItems.length == 1) {
          usuario.id = queriedItems[0].$key
          resolve(usuario);
        } else {
          return null;
        }
      });
    });
  }


  public fbLogin(idFacebook: String): Promise<Boolean> {
    const queryList = this.af.database.list('/user', {
      query: {
        orderByChild: 'fbID',
        equalTo: idFacebook
      }
    });
    return new Promise(resolve => {
      queryList.subscribe(queriedItems => {
        resolve(queriedItems.length == 1);
      });
    });
  }

}
