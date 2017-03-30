import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Depoimento } from '../model/depoimento';

@Injectable()
export class DepoimentoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {

  }

  public getDepoimentoAprovados(): Promise<Depoimento[]> {
    return this.http.get("http://dsoutlet.com.br/apiLuiz/listaDepoimento.php?tipo=ap")
    .toPromise()
    .then(res => res.json())
    .catch(this.handleErrorMessage);
  }

  public getDepoimentoAvaliar(): Promise<Depoimento[]> {
    return this.http.get("http://dsoutlet.com.br/apiLuiz/listaDepoimento.php?tipo=sa")
    .toPromise()
    .then(res => res.json())
    .catch(this.handleErrorMessage);
  }

  public enviarDepoimento(texto: string, idUser): Promise<boolean> {
    return this.http.post("http://dsoutlet.com.br/apiLuiz/depoimento.php", JSON.stringify({ texto, idUser }), { headers: this.headers }).toPromise().then(res => res.json())
      .catch(this.handleErrorMessage);
  }

  public aprovar(id): Promise<boolean> {
    return this.http.get("http://dsoutlet.com.br/apiLuiz/aprovarDepoimento.php?id=" + id)
    .toPromise()
    .then(res => res.json())
    .catch(this.handleErrorMessage);
  }

  public negar(id): Promise<boolean> {
    return this.http.get("http://dsoutlet.com.br/apiLuiz/negarDepoimento.php?id=" + id)
    .toPromise()
    .then(res => res.json())
    .catch(this.handleErrorMessage);
  }

  private handleErrorMessage(error: any) {
    return false;
  }

}
