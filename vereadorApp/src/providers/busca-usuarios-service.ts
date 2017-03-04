import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Usuario } from '../model/user';

/*
  Generated class for the BuscaUsuariosService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BuscaUsuariosService {

  private link : string = 'http://dsoutlet.com.br/apiLuiz/busca.php?id';


  constructor(public http: Http) {
    console.log('Hello BuscaUsuariosService Provider');
  }

  getUserAll():Promise<Usuario[]>{
    return this.http.get(this.link).toPromise().then(res=>res.json()).catch(()=>alert("Erro ao se conectar com o servidor"));
  }

}
