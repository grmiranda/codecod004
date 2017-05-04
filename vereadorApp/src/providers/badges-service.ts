import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
/*
  Generated class for the BadgesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BadgesService {

  constructor(
    public http: Http,
    public events: Events
    ) {
  }

  publicar(id){
    this.get(id).then(badges=>this.events.publish('badges', badges));    
  }

  get(id):Promise<any>{
    return this.http.get('http://www.dsoutlet.com.br/apiLuiz/getBadges.php?id='+ id)
      .toPromise()
      .then(response => response.json());
  }

}
