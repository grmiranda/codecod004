import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

/*
  Generated class for the FirebaseService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseService {
  users: FirebaseListObservable<any>;
  
  constructor(public http: Http, public af: AngularFire) {
    
  }

  public fbLogin(idFacebook: String): Boolean{
    const queryList = this.af.database.list('/user', {
      query: {
        orderByChild: 'fbID',
        equalTo: idFacebook
      }
    });
    queryList.subscribe(queriedItems => {
      if(queriedItems.length == 1){
        return true;
      } else {
        return false;
      }
    });
    return false;
  }

}
