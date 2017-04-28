import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the OpcoesUsuarioService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class OpcoesUsuarioService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
    console.log('Hello CadastroService Provider');
  }

  public banimento(id): Promise<any> {
    return this.http.post("http://dsoutlet.com.br/apiLuiz/banimento.php", JSON.stringify(id), { headers: this.headers }).toPromise().then(res => res.json())
      .catch(() => alert("Erro ao tentar se conectar com servidor"));
  }

  public permissao(id): Promise<any> {
    return this.http.post("http://dsoutlet.com.br/apiLuiz/permissao.php", JSON.stringify(id), { headers: this.headers }).toPromise().then(res => res.json())
      .catch(() => alert("Erro ao tentar se conectar com servidor"));
  }

}
