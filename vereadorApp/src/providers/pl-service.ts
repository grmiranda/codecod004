import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ProjetoDeLei } from '../model/projeto-de-lei';
import 'rxjs/add/operator/toPromise';
import { CriptografiaService } from './criptografia-service';

@Injectable()
export class ProjetoDeLeiService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: Http, 
    private crip: CriptografiaService
    ) {

  }

  public addProjetoDeLei(projetoDeLei: ProjetoDeLei): Promise<any> {
    let dados = this.crip.enc(projetoDeLei);
    return this.http
      .post('http://www.dsoutlet.com.br/apiLuiz/addProjetoDeLei.php', dados, { headers: this.headers })
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

  public getProjetosDeLei(estado: string): Promise<any> {
    return this.http.get('http://www.dsoutlet.com.br/apiLuiz/getProjetosDeLei.php?estado=' + estado)
      .toPromise()
      .then(response => this.extractGetData(response))
      .catch(this.handleErrorMessage);
  }

  public plGetId(id): Promise<any> {
    return this.http.get('http://www.dsoutlet.com.br/apiLuiz/getPlId.php?id=' + id)
      .toPromise()
      .then(response => this.extractGetData(response))
      .catch(this.handleErrorMessage);
  }


  public getProjetosDeLeiLikes(estado: string, idUsuario: number): Promise<any> {
    return this.http.get('http://www.dsoutlet.com.br/apiLuiz/getProjetosDeLei.php?estado=' + estado + '&id=' + idUsuario)
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

  public editProjetoDeLei(projetoDeLei: ProjetoDeLei): Promise<any> {
    let dados = this.crip.enc(projetoDeLei);
    return this.http
      .post('http://www.dsoutlet.com.br/apiLuiz/editProjetoDeLei.php', dados, { headers: this.headers })
      .toPromise()
      .then(res => this.extractEditData(res))
      .catch(this.handleErrorMessage);
  }

  public delete(projetoDeLei: ProjetoDeLei): Promise<any> {
    return this.http
      .post('http://www.dsoutlet.com.br/apiLuiz/delProjetoDeLei.php', JSON.stringify(projetoDeLei.IDPL), { headers: this.headers })
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
