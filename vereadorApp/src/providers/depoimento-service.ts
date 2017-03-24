import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Depoimento } from '../model/depoimento';

/*
  Generated class for the DepoimentoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DepoimentoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {

  }

  public getDepoimentoAprovados(): Promise<Depoimento[]> {
    return this.http.get("http://dsoutlet.com.br/apiLuiz/listaDepoimento.php?tipo=ap").toPromise().then(res => res.json())
      .catch(() => alert("Erro ao tentar se conectar com o servidor"));
  }

  public getDepoimentoAvaliar(): Promise<Depoimento[]> {
    return this.http.get("http://dsoutlet.com.br/apiLuiz/listaDepoimento.php?tipo=sa").toPromise().then(res => res.json())
      .catch(() => alert("Erro ao tentar se conectar com o servidor"));
  }

  public enviarDepoimento(texto: string, idUser): Promise<boolean> {
    return this.http.post("http://dsoutlet.com.br/apiLuiz/depoimento.php", JSON.stringify({ texto, idUser }), { headers: this.headers }).toPromise().then(res => res.json())
      .catch(() => alert("Erro ao tentar se conectar com o servidor"));
  }

  public aprovar(id): Promise<boolean> {
    return this.http.get("http://dsoutlet.com.br/apiLuiz/aprovarDepoimento.php?id=" + id).toPromise().then(res => res.json())
      .catch(() => alert("Erro ao tentar se conectar com o servidor"));
  }

  public negar(id): Promise<boolean> {
    return this.http.get("http://dsoutlet.com.br/apiLuiz/negarDepoimento.php?id=" + id).toPromise().then(res => res.json())
      .catch(() => alert("Erro ao tentar se conectar com o servidor"));
  }

}


