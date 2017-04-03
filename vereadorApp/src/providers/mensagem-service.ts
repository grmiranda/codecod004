import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { CorpoMensagem } from '../model/mensagem';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MensagemService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
  }

  public enviarMensagem(mensagem : CorpoMensagem):Promise<boolean>{
      return this.http.post("http://dsoutlet.com.br/apiLuiz/enviarMsg.php", JSON.stringify(mensagem), { headers: this.headers }).toPromise().then(res=>res.json())
      .catch(this.handleErrorMessage);
  }

  public getMensagemEnviada(id):Promise<CorpoMensagem[]>{
    return this.http.get("http://dsoutlet.com.br/apiLuiz/verSaida.php?id="+ id).toPromise().then(res=>res.json())
    .catch(this.handleErrorMessage);
  }

  public getMensagemRecebida(id):Promise<CorpoMensagem[]>{
    return this.http.get("http://dsoutlet.com.br/apiLuiz/caixaEntrada.php?id="+ id).toPromise().then(res=>res.json())
    .catch(this.handleErrorMessage);
  }

  public ler(id, idu){
    this.http.get("http://dsoutlet.com.br/apiLuiz/ler.php?IDM="+ id + "&IDU=" + idu).toPromise().then(res=>res.json());
  }

  public deletar(IDUsuario, IDMensagem):Promise<boolean>{
    return this.http.post("http://dsoutlet.com.br/apiLuiz/delMsg.php", JSON.stringify({IDUsuario,IDMensagem} ), { headers: this.headers })
    .toPromise().then(res=>res.json()).catch(this.handleErrorMessage);
  }

  private handleErrorMessage(error: any) {
    return false;
  }

}
