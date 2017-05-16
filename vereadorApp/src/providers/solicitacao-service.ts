import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Solicitacao } from '../model/solicitacao';
import 'rxjs/add/operator/toPromise';
import { CriptografiaService } from './criptografia-service';


@Injectable()
export class SolicitacaoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: Http, 
    private crip: CriptografiaService
    ) {

  }

  public addSolicitacao(solicitacao: Solicitacao): Promise<any> {
    let dados = this.crip.enc(solicitacao);
    return this.http
      .post('http://www.dsoutlet.com.br/apiLuiz/addSolicitacao.php', dados, { headers: this.headers })
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

  public delSolicitacao(solicitacao: Solicitacao): Promise<any> {
    return this.http
      .post('http://www.dsoutlet.com.br/apiLuiz/delSolicitacao.php', JSON.stringify(solicitacao), { headers: this.headers })
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

  public getSolicitacoes(estado: string): Promise<any> {
    return this.http.get('http://www.dsoutlet.com.br/apiLuiz/getSolicitacoes.php?estado=' + estado)
      .toPromise()
      .then(response => this.extractGetData(response))
      .catch(this.handleErrorMessage);
  }

  public getSolicitacoesPropostas(estado: string, idUsuario): Promise<any> {
    return this.http.get('http://www.dsoutlet.com.br/apiLuiz/getSolicitacoes.php?estado=' + estado + '&id=' + idUsuario)
      .toPromise()
      .then(response => this.extractGetData(response))
      .catch(this.handleErrorMessage);
  }

  public getSolicitacaoId(id): Promise<any> {
    return this.http.get('http://www.dsoutlet.com.br/apiLuiz/getSolicitacaoId.php?id=' + id)
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

  public editSolicitacao(solicitacao: Solicitacao): Promise<any> {
    let dados = this.crip.enc(solicitacao);
    return this.http
      .post('http://www.dsoutlet.com.br/apiLuiz/editSolicitacao.php', dados, { headers: this.headers })
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
