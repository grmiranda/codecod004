import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ShareService } from '../../providers/share-service';

@Component({
  selector: 'page-compartilhar',
  templateUrl: 'compartilhar.html'
})
export class CompartilharPage {
  private titulo: string;
  private subtitulo: string;
  private foto: string;

  constructor(public navParams: NavParams,
    public view: ViewController,
    private shareService: ShareService) {
    this.titulo = this.navParams.get('titulo');
    this.subtitulo = this.navParams.get('subtitulo');
    this.foto = this.navParams.get('foto');
  }

  private cancel() {
    this.view.dismiss()
  }


  private compartilharFacebook() {
    this.shareService.compartilharFacebook(this.titulo, this.subtitulo, this.foto, null);
    this.view.dismiss()
  }

  private compartilharTwitter(){
    this.shareService.compartilharTwitter(this.titulo, this.foto, null);
    this.view.dismiss()
  }

  private compartilharInstagram(){
    this.shareService.compartilharInstagram(this.titulo, this.foto);
    this.view.dismiss();
  }

  private compartilharWhatsApp(){
    this.shareService.compartilharWhatsApp(`*${this.titulo}* - ${this.subtitulo} \nvia *LUIZ DA FEIRA*`, this.foto, null);
    this.view.dismiss()
  }

  private compartilharEmail(){
    this.shareService.compartilharEmail(this.titulo, this.subtitulo, this.foto, null);
    this.view.dismiss()
  }

  private compartilharOutros(){
    this.shareService.compartilhar(this.titulo, this.subtitulo, this.foto, null);
  }

}
