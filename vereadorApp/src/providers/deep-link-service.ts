import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DeepLinkService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DeepLinkService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private link: string = "https://api.branch.io/v1/url";

  constructor(public http: Http) {
    console.log('Hello DeepLinkService Provider');
  }

  public criarLink(url: string): Promise<any> {
    let dados2 = JSON.stringify({ url: url });
    let dados = {
      "branch_key": "key_live_agxuCk67gm0N5XZ72ohENfnbBub0Ds7V",
      "app_id": "⁠⁠⁠382540984975643486",
      "alias": url,
      "campaign": "announcement",
      "feature": "invite",
      "channel": "email",
      "tags": ["1"],
      "data": dados2
    }
    return this.http.post(this.link, JSON.stringify(dados), { headers: this.headers }).toPromise()
      .then(resS => resS.json().url).catch(function (error) {
        let erro = error.json();
        if(erro.code == 409){
          return "https://luizdafeira.app.link/" + url;
        } else {
          return "https://luizdafeira.app.link/luizdafeira";
        }
      });
  }

}
