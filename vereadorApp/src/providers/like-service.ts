import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { LikeSolicitacao } from '../model/like-solicitacao';
import { LikeProjetoDeLei } from '../model/like-projeto-de-lei';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LikeService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {

  }

  public addLikeSolicitacao(like: LikeSolicitacao): Promise<any> {
    return this.http
      .post('http://www.dsoutlet.com.br/apiLuiz/addLikeSolicitacao.php', JSON.stringify(like), { headers: this.headers })
      .toPromise()
      .then(res => this.extractAddData(res))
      .catch(this.handleErrorMessage);
  }

  private extractAddData(res: Response) {
    let retorno = { error: false, value: false };
    let data = res.json();
    if (data) {
      retorno.value = data;
    }
    return retorno;
  }

  private extractGetData(res: Response): any {
    let retorno = { error: false, value: false };
    let data = res.json();
    if (data) {
      retorno.value = data;
    }
    return retorno;
  }

  public addLikeProjetoDeLei(like: LikeProjetoDeLei): Promise<any> {
    return this.http
      .post('http://www.dsoutlet.com.br/apiLuiz/addLikeProjetoDeLei.php', JSON.stringify(like), { headers: this.headers })
      .toPromise()
      .then(res => this.extractAddData(res))
      .catch(this.handleErrorMessage);
  }

  public getLikeSolicitacaoByID(idUsuario, idSolicitacao) {
    return this.http
      .get('http://www.dsoutlet.com.br/apiLuiz/getLikeSolicitacaoID.php?user=' + idUsuario + '&solicitacao=' + idSolicitacao, { headers: this.headers })
      .toPromise()
      .then(res => this.extractGetData(res))
      .catch(this.handleErrorMessage);
  }

  private handleErrorMessage(error: any): any {
    let retorno = { error: true };
    return retorno;
  }

}
