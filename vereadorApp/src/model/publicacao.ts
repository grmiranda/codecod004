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

  copy(publicaoCopia:Publicacao){
    this.IDPublicacao = publicaoCopia.IDPublicacao;
    this.titulo = publicaoCopia.titulo;
    this.texto = publicaoCopia.texto;
    this.fotoURL = [].concat(publicaoCopia.fotoURL);
    this.video = publicaoCopia.video;

  }

}
