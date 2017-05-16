import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Usuario } from '../model/user';
import 'rxjs/add/operator/toPromise';
import { CriptografiaService } from './criptografia-service';

/*
  Generated class for the BuscaUsuariosService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BuscaUsuariosService {

  private link: string = 'http://dsoutlet.com.br/apiLuiz/busca.php?id';


  constructor(
    public http: Http, 
    private crip: CriptografiaService
    ) {
   
  }

  getUserAll(): Promise<any> {
    return this.http.get(this.link).toPromise().then(res => this.extractGetData(res)).catch(this.handleErrorMessage);
  }

  getUserList(id): Promise<any>  {
    return this.http.get('http://dsoutlet.com.br/apiLuiz/users.php?id=' + id).toPromise().then(res => this.extractGetData(res)).catch(this.handleErrorMessage);
  }

  getBanidoPermissao(id): Promise<any>  {
    return this.http.get('http://dsoutlet.com.br/apiLuiz/banido.php?id=' + id).toPromise().then(res => this.extractGetData(res)).catch(this.handleErrorMessage);
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
