import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Evento } from '../model/evento';

/*
  Generated class for the EventoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventoService {

  private link: string = "http://dsoutlet.com.br/apiLuiz/evento.php?evento=";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
    console.log('Hello EventoService Provider');
  }

  public getEventos(): Promise<any>{
    return this.http.get(this.link).toPromise().then(res=>res.json()).catch(()=>alert("Erro ao tentar se conectar com o servidor"));
  }

  public addEvento(evento): Promise<Evento>{
    return this.http.post("http://dsoutlet.com.br/apiLuiz/evento.php", JSON.stringify(evento), { headers: this.headers }).toPromise().then(res=>res.json())
    .catch(()=>alert("Erro ao tentar se conectar com o servidor"));
  }

  public removeEvento(idEvento): Promise<boolean>{
    return this.http.post("http://dsoutlet.com.br/apiLuiz/delEvento.php", JSON.stringify(idEvento), { headers: this.headers }).toPromise().then(res=>res.json())
    .catch(()=>alert("Erro ao tentar se conectar com o servidor"));    
  }

  public editEvento(evento): Promise<boolean>{
    return this.http.post("http://dsoutlet.com.br/apiLuiz/editEvento.php", JSON.stringify(evento), { headers: this.headers }).toPromise().then(res=>res.json())
    .catch(()=>alert("Erro ao tentar se conectar com o servidor"));    
  }

}
