import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Publicacao } from '../model/publicacao';
import 'rxjs/add/operator/toPromise';
import { CriptografiaService } from './criptografia-service';

@Injectable()
export class PublicacaoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http, private crip: CriptografiaService) {

  }

  public addPublicacao(publicacao: Publicacao): Promise<any> {
    let dados = this.crip.enc(publicacao);
    return this.http
      .post('http://www.dsoutlet.com.br/apiLuiz/addPublicacao.php', dados, { headers: this.headers })
      .toPromise()
      .then(res => this.extractAddData(res))
      .catch(this.handleErrorMessage);
  }

  private extractAddData(res: Response) {
    let retorno = { error: false, value: false };
    let data = res.json();
    if (data === true) {
      retorno.value = true;
    }
    return retorno;
  }

  public getPublicacoes(): Promise<any> {
    return this.http.get('http://www.dsoutlet.com.br/apiLuiz/getPublicacoes.php?id')
      .toPromise()
      .then(response => this.extractGetData(response))
      .catch(this.handleErrorMessage);
  }

  public getPublicaoId(id): Promise<any> {
    return this.http.get('http://www.dsoutlet.com.br/apiLuiz/getPublicacoes.php?id='+ id)
      .toPromise()
      .then(response => this.extractGetData(response))
      .catch(this.handleErrorMessage);
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

  public deletePublicacao(publicacao: Publicacao): Promise<any> {
    return this.http
      .post('http://www.dsoutlet.com.br/apiLuiz/delPublicacao.php', JSON.stringify(publicacao), { headers: this.headers })
      .toPromise()
      .then(res => this.extractDelData(res))
      .catch(this.handleErrorMessage);
  }

  private extractDelData(res: Response) {
    let retorno = { error: false, value: false };
    let data = res.json();
    if (data === true) {
      retorno.value = true;
    }
    return retorno;
  }

  public editPublicacao(publicacao: Publicacao): Promise<any> {
    return this.http
      .post('http://www.dsoutlet.com.br/apiLuiz/editPublicacao.php', JSON.stringify(publicacao), { headers: this.headers })
      .toPromise()
      .then(res => this.extractEditData(res))
      .catch(this.handleErrorMessage);
  }

  private extractEditData(res: Response) {
    let retorno = { error: false, value: false };
    let data = res.json();
    if (data === true) {
      retorno.value = true;
    }
    return retorno;
  }

  private handleErrorMessage(error: any) {
    let retorno = { error: true };
    return retorno;
  }

}
