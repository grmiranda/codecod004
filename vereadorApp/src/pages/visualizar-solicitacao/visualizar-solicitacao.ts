import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Solicitacao } from '../../model/solicitacao';

@Component({
  selector: 'page-visualizar-solicitacao',
  templateUrl: 'visualizar-solicitacao.html'
})
export class VisualizarSolicitacaoPage {

  private solicitacao:Solicitacao;

  constructor(public navParams: NavParams) {
      this.solicitacao = navParams.get('solicitacao');
  }

}
