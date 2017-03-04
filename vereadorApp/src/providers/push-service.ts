import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { OneSignal } from 'ionic-native';
import { Usuario } from '../model/user';

/*
  Generated class for the PushService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PushService {

  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Basic NTQ1M2ZhNDUtMzkzNS00YzAzLWFhZTItOWFkZGU0ZjY1ZWQz' });

  constructor(public http: Http) {
    console.log('Hello PushService Provider');
  }

  public getId(): Promise<any> {
    return OneSignal.getIds().then(res => res.userId).catch(() => alert("erro ao pegar id"));
  }

  addTag(tag: string) {
    OneSignal.sendTag("permissao", tag);
  }

  removeTag(tag: string) {
    OneSignal.deleteTag("permissao");
  }

  pushUmaPessoa(mensagem, pessoa: Usuario) {
    alert(JSON.stringify(pessoa));
    this.http.post('https://onesignal.com/api/v1/notifications', JSON.stringify({
      "app_id": "04946cb2-d0f6-485b-a390-fea608737a42",
      "headings": { "en": "Luiz da Feira" },
      "data": { "foo": "bar" },
      "include_player_ids": [pessoa.Push],
      "contents": { "en": mensagem }
    }), { headers: this.headers }).toPromise().then(res => alert(res)).catch(error => alert("erro ao enviar notificações"));
  }

  pushGrupo(mensagem, grupo) {
    this.http.post('https://onesignal.com/api/v1/notifications', JSON.stringify({
      "app_id": "04946cb2-d0f6-485b-a390-fea608737a42",
      "headings": { "en": "Luiz da Feira" },
      "data": { "foo": "bar" },
      "included_segments": ["grupo"],
      "contents": { "en": mensagem }
    }), { headers: this.headers }).toPromise().then(res => alert(res)).catch(error => alert("erro ao enviar notificações"));
  }



}
