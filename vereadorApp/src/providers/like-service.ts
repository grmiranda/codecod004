import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Like } from '../model/like';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LikeService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {

  }

  public addLike(like: Like): Promise<any> {
    return this.http
      .post('http://www.dsoutlet.com.br/apiLuiz/addLike.php', JSON.stringify(like), { headers: this.headers })
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

  public getLikes(): Promise<any> {
    return this.http.get('http://www.dsoutlet.com.br/apiLuiz/getLikes.php?id')
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

  private handleErrorMessage(error: any) {
    let retorno = { error: true };
    return retorno;
  }

}
