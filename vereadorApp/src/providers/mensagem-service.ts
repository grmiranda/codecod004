import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { CorpoMensagem } from '../model/mensagem';
import 'rxjs/add/operator/toPromise';
import { CriptografiaService } from './criptografia-service';

@Injectable()
export class MensagemService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    public http: Http, 
    private crip: CriptografiaService
  ) {
  }

  public enviarMensagem(mensagem : CorpoMensagem):Promise<boolean>{
      let dados = this.crip.enc(mensagem);
      return this.http.post("http://dsoutlet.com.br/apiLuiz/enviarMsg.php", dados, { headers: this.headers }).toPromise().then(res=>res.json())
      .catch(this.handleErrorMessage);
  }

  public getMensagemEnviada(id):Promise<any>{
    return this.http.get("http://dsoutlet.com.br/apiLuiz/verSaida.php?id="+ id).toPromise().then(response => this.extractGetData(response))
      .catch(this.handleErrorMessage);
  }

  public getMensagemRecebida(id):Promise<any>{
    return this.http.get("http://dsoutlet.com.br/apiLuiz/caixaEntrada.php?id="+ id).toPromise().then(response => this.extractGetData(response))
      .catch(this.handleErrorMessage);
  }

  public ler(id, idu){
    this.http.get("http://dsoutlet.com.br/apiLuiz/ler.php?IDM="+ id + "&IDU=" + idu).toPromise().then(res=>res.json());
  }

  public deletar(IDUsuario, IDMensagem):Promise<boolean>{
    return this.http.post("http://dsoutlet.com.br/apiLuiz/delMsg.php", JSON.stringify({IDUsuario,IDMensagem} ), { headers: this.headers })
    .toPromise().then(res=>res.json()).catch(this.handleErrorMessage);
  }

    private extractGetData(res: Response) {
    let retorno = { error: false, data: [] };
    let data = this.crip.dec(res);
    if (data == null) {
      retorno.error = true;
    } else {
      retorno.data = data;
    }
    return retorno;
  }

  private handleErrorMessage(error: any) {
    let retorno = { error: true };
    return retorno;
  }

}
