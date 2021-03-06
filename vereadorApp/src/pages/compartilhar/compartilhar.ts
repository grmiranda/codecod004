import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ShareService } from '../../providers/share-service';
import { DeepLinkService } from '../../providers/deep-link-service';


@Component({
  selector: 'page-compartilhar',
  templateUrl: 'compartilhar.html'
})
export class CompartilharPage {
  private titulo: string;
  private subtitulo: string;
  private foto: string;
  private url: string;
  private tipo: string;
  private id: string;

  constructor(
    public navParams: NavParams,
    public view: ViewController,
    private deepL: DeepLinkService,
    private shareService: ShareService) {
    this.titulo = this.navParams.get('titulo');
    this.subtitulo = this.navParams.get('subtitulo');
    this.tipo = this.navParams.get('tipo');
    this.id = this.navParams.get('id');
    this.foto = this.navParams.get('foto');
    this.url = this.navParams.get('url');

    if (this.url == undefined || this.url == null) {
      this.deepL.criarLink(`${this.tipo}-${this.id}`).then(urlRetorno => this.url = urlRetorno);
    }
  }

  private cancel() {
    this.view.dismiss()
  }

  private verificaLink(): boolean {
    if (this.url == undefined) {
      this.deepL.criarLink(`${this.tipo}-${this.id}`).then(urlRetorno => {
        this.url = urlRetorno;
        this.verificaLink()
      });

    } else {
      return true;
    }
  }


  private compartilharFacebook() {
    if (this.verificaLink) {
      // alert(this.url);
      this.shareService.compartilharFacebook(this.titulo, this.subtitulo, this.foto, this.url);
    }
    this.view.dismiss()
  }

  private compartilharTwitter() {
    if (this.verificaLink) {
      this.shareService.compartilharTwitter(this.titulo, this.foto, this.url);
    }
    this.view.dismiss()
  }

  private compartilharInstagram() {
    if (this.verificaLink) {
      this.shareService.compartilharInstagram(this.titulo + " - " + this.url, this.foto);
    }
    this.view.dismiss();
  }

  private compartilharWhatsApp() {
    if (this.verificaLink) {
      this.shareService.compartilharWhatsApp(`*${this.titulo}* - ${this.subtitulo} \nvia *LUIZ DA FEIRA* - ${this.url}`, this.foto, null);
    }
    this.view.dismiss()
  }

  private compartilharEmail() {
    if (this.verificaLink) {
      this.shareService.compartilharEmail(this.titulo, this.subtitulo, this.foto, this.url);
    }
    this.view.dismiss()
  }

  private compartilharOutros() {
    if (this.verificaLink) {
      this.shareService.compartilhar(this.titulo, this.subtitulo, this.foto, this.url);
    }
  }

}
