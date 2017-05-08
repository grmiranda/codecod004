import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Depoimento } from '../model/depoimento';
import { CriptografiaService } from './criptografia-service';

@Injectable()
export class DepoimentoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http, private crip: CriptografiaService) {

  }

  public getDepoimentoAprovados(): Promise<any> {
    return this.http.get("http://dsoutlet.com.br/apiLuiz/listaDepoimento.php?tipo=ap")
    .toPromise()
    .then(res => this.extractGetData(res))
    .catch(this.handleErrorMessage);
  }

  public getDepoimentoAvaliar(): Promise<any> {
    return this.http.get("http://dsoutlet.com.br/apiLuiz/listaDepoimento.php?tipo=sa")
    .toPromise()
    .then(res => this.extractGetData(res))
    .catch(this.handleErrorMessage);
  }

  public enviarDepoimento(texto: string, idUser): Promise<boolean> {
    return this.http.post("http://dsoutlet.com.br/apiLuiz/depoimento.php", JSON.stringify({ texto, idUser }), { headers: this.headers }).toPromise().then(res => res.json())
      .catch(this.handleErrorMessage);
  }

  public aprovar(id): Promise<boolean> {
    return this.http.get("http://dsoutlet.com.br/apiLuiz/aprovarDepoimento.php?id=" + id)
    .toPromise()
    .then(res => this.extractGetData(res))
    .catch(this.handleErrorMessage);
  }

  public negar(id): Promise<boolean> {
    return this.http.get("http://dsoutlet.com.br/apiLuiz/negarDepoimento.php?id=" + id)
    .toPromise()
    .then(res => this.extractGetData(res))
    .catch(this.handleErrorMessage);
  }

  private handleErrorMessage(error: any) {
    return false;
  }

  private extractGetData(res) {
    let retorno = { error: false, data: [] };
    let data = this.crip.dec(res);
    if (data == null) {
      retorno.error = true;
    } else {
      retorno.data = data;
    }
    return retorno;
  }

}
