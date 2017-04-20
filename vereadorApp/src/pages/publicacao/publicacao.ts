import { Component } from '@angular/core';
import { NavParams, PopoverController, LoadingController } from 'ionic-angular';
import { Publicacao } from '../../model/publicacao';
import { CompartilharPage } from '../compartilhar/compartilhar';
import { PublicacaoService } from '../../providers/publicacao-service';

@Component({
  selector: 'page-publicacao',
  templateUrl: 'publicacao.html'
})
export class PublicacaoPage {

  public publicacao: Publicacao;

  constructor(
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public publicacaoService: PublicacaoService
  ) {
    this.publicacao = this.navParams.get("publicacao");
    if (this.publicacao.titulo == "") {
      let loading = this.loadingCtrl.create({
        content: 'Carregando'
      });
      loading.present();
      this.publicacaoService.getPublicaoId(this.publicacao.IDPublicacao).then(buscaP => {
        this.publicacao = buscaP.data;
        loading.dismiss();
      }).catch(() => loading.dismiss());
      
    }
  }

  compartilhar() {
    let popover = this.popoverCtrl.create(CompartilharPage, { titulo: this.publicacao.titulo, subtitulo: this.publicacao.texto, foto: this.publicacao.fotoURL[0], tipo: "publicacao", id: this.publicacao.IDPublicacao });
    let ev = {
      target: {
        getBoundingClientRect: () => {
          return {
            top: '100'
          };
        }
      }
    };
    popover.present({ ev: event });
  }

}
