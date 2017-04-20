import { Component } from '@angular/core';
import { NavParams, PopoverController } from 'ionic-angular';
import { Publicacao } from '../../model/publicacao';
import { CompartilharPage } from '../compartilhar/compartilhar';

@Component({
  selector: 'page-publicacao',
  templateUrl: 'publicacao.html'
})
export class PublicacaoPage {

  public publicacao: Publicacao;

  constructor(
    public navParams: NavParams,
    public popoverCtrl: PopoverController
    ) {
    this.publicacao = this.navParams.get("publicacao");
  }

  compartilhar(){
    let popover = this.popoverCtrl.create(CompartilharPage, { titulo:this.publicacao.titulo, subtitulo:this.publicacao.texto, foto:this.publicacao.fotoURL[0], tipo: "publicacao", id: this.publicacao.IDPublicacao });
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
