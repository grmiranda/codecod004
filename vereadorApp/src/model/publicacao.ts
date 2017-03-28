import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';


export class Publicacao {

  public IDPublicacao: number;
  public titulo: string = "";
  public texto: string = "";
  public fotoURL: string[]  = [];
  public video: string = "";
  public videoUrl: SafeResourceUrl;

  constructor(){

  }

}
