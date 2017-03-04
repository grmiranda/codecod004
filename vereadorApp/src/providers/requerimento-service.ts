import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Requerimento } from '../model/requerimento';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RequerimentoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {

  }

  public addRequerimento(requerimento: Requerimento): Promise<any> {
    return this.http
      .post('http://www.dsoutlet.com.br/apiLuiz/addRequerimento.php', JSON.stringify(requerimento), { headers: this.headers })
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

  public getRequerimentosByID(id: number): Promise<any> {
    return this.http.get('http://www.dsoutlet.com.br/apiLuiz/getRequerimentos.php?solicitacaoID='+id)
      .toPromise()
      .then(response => this.extractGetData(response))
      .catch(this.handleErrorMessage);
  }

  private extractGetData(res: Response) {
    let retorno = { error: false, data: [] };
    let data = res.json();
    if (data == null) {
      retorno.error = true;
    } else {
      retorno.data = data;
    }
    return retorno;
  }

  public deleteRequerimento(id: number): Promise<any> {
    return this.http
      .post('http://www.dsoutlet.com.br/apiLuiz/delRequerimento.php', JSON.stringify(id), { headers: this.headers })
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

  public editRequerimento(requerimento: Requerimento): Promise<any> {
    return this.http
      .post('http://www.dsoutlet.com.br/apiLuiz/editRequerimento.php', JSON.stringify(requerimento), { headers: this.headers })
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
