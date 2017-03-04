import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { CorpoMensagem } from '../model/mensagem';
import 'rxjs/add/operator/toPromise';


/*
  Generated class for the MensagemService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MensagemService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
    console.log('Hello MensagemService Provider');
  }

  public enviarMensagem(mensagem : CorpoMensagem):Promise<boolean>{
      return this.http.post("http://dsoutlet.com.br/apiLuiz/enviarMsg.php", JSON.stringify(mensagem), { headers: this.headers }).toPromise().then(res=>res.json())
      .catch(()=>alert("Erro ao conectar com o servidor"));
  }

  public getMensagemEnviada(id):Promise<CorpoMensagem>{
    return this.http.get("http://dsoutlet.com.br/apiLuiz/verSaida.php?id="+ id).toPromise().then(res=>res.json())
    .catch(()=>alert("Erro ao tentar se conectar com o servidor"));
  }

  public getMensagemRecebida(id):Promise<CorpoMensagem[]>{
    return this.http.get("http://dsoutlet.com.br/apiLuiz/caixaEntrada.php?id="+ id).toPromise().then(res=>res.json())
    .catch(()=>alert("Erro ao tentar se conectar com o servidor"));
  }

  public ler(id){
    this.http.get("http://dsoutlet.com.br/apiLuiz/ler.php?id="+ id).toPromise().then(res=>res.json());
  }

}
