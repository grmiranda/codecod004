import { Component } from '@angular/core';
import { NavParams, PopoverController } from 'ionic-angular';
import { Solicitacao } from '../../model/solicitacao';
import { CompartilharPage } from '../compartilhar/compartilhar';

@Component({
  selector: 'page-visualizar-solicitacao',
  templateUrl: 'visualizar-solicitacao.html'
})
export class VisualizarSolicitacaoPage {

  private solicitacao: Solicitacao;

  constructor(
    public navParams: NavParams,
    public popoverCtrl: PopoverController
  ) {
    this.solicitacao = navParams.get('solicitacao');
  }

  compartilhar() {
    let popover = this.popoverCtrl.create(CompartilharPage, { titulo: this.solicitacao.titulo, subtitulo: this.solicitacao.descricao, foto: this.solicitacao.fotoURL[0] });
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
