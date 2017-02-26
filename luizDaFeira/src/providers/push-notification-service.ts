import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


/*
  Generated class for the PushNotificationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PushNotificationService {

  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Basic NTQ1M2ZhNDUtMzkzNS00YzAzLWFhZTItOWFkZGU0ZjY1ZWQz' });


  constructor(public http: Http) {
    console.log('Hello PushNotificationService Provider');
  }

  push(mensagem) {
    this.http.post('https://onesignal.com/api/v1/notifications', JSON.stringify({
      "app_id": "04946cb2-d0f6-485b-a390-fea608737a42",
      "included_segments": ["All"],
      "headings": { "en": "Luiz da Feira" },
      "data": { "foo": "bar" },
      "contents": { "en": mensagem }
    }), { headers: this.headers }).toPromise().then(res => alert(res)).catch(error => alert("erro ao enviar notificações"));
  }

}
