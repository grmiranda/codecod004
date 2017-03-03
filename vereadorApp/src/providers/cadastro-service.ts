import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Usuario } from '../model/user';

@Injectable()
export class CadastroService {

  private link: string = "http://dsoutlet.com.br/apiLuiz/cadastro.php";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
    console.log('Hello CadastroService Provider');
  }

  public cadastrar(usuario : Usuario):Promise <any>{
    return this.http.post(this.link, JSON.stringify(usuario), { headers: this.headers }).toPromise().then(res=>res.json())
    .catch(()=>alert("Erro ao tentar se conectar com servidor"));
  }
  l



}
