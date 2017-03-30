import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Evento } from '../model/evento';

@Injectable()
export class EventoService {

  private link: string = "http://dsoutlet.com.br/apiLuiz/evento.php?evento=";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
  }

  public getEventos(): Promise<any>{
    return this.http.get(this.link).toPromise().then(res=>res.json()).catch(this.handleErrorMessage);
  }

  public addEvento(evento): Promise<Evento>{
    return this.http.post("http://dsoutlet.com.br/apiLuiz/evento.php", JSON.stringify(evento), { headers: this.headers }).toPromise().then(res=>res.json())
    .catch(this.handleErrorMessage);
  }

  public removeEvento(idEvento): Promise<boolean>{
    return this.http.post("http://dsoutlet.com.br/apiLuiz/delEvento.php", JSON.stringify(idEvento), { headers: this.headers }).toPromise().then(res=>res.json())
    .catch(this.handleErrorMessage);
  }

  public editEvento(evento): Promise<boolean>{
    return this.http.post("http://dsoutlet.com.br/apiLuiz/editEvento.php", JSON.stringify(evento), { headers: this.headers }).toPromise().then(res=>res.json())
    .catch(this.handleErrorMessage);
  }

  private handleErrorMessage(error: any) {
    return false;
  }

}
