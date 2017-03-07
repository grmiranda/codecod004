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
    if (data === true) {
      retorno.value = true;
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

  // php ainda nao foi elaborado
  // public getLikeSolicitacao(): Promise<any> {
  //   return this.http.get('http://www.dsoutlet.com.br/apiLuiz/getLikeSolicitacao.php?id')
  //     .toPromise()
  //     .then(response => this.extractGetData(response))
  //     .catch(this.handleErrorMessage);
  // }
  //
  // private extractGetData(res: Response) {
  //   let retorno = { error: false, data: [] };
  //   let data = res.json();
  //   if (data == null) {
  //     retorno.error = true;
  //   } else {
  //     retorno.data = data;
  //   }
  //   return retorno;
  // }

  private handleErrorMessage(error: any) {
    let retorno = { error: true };
    return retorno;
  }

}
