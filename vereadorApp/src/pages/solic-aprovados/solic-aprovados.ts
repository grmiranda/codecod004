import { Component } from '@angular/core';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { Solicitacao } from '../../model/solicitacao';

@Component({
  selector: 'page-solic-solicitados',
  templateUrl: 'solic-solicitados.html'
})
export class SolicAprovadosPage {

  private solicitacoes: Solicitacao[] = [];

  constructor(public solicitacaoService: SolicitacaoService) { }

  ionViewWillEnter() {
    this.carregarSolicitacoes();
  }

  private carregarSolicitacoes() {
    this.solicitacaoService.getSolicitacoes('cp').then(res => {
      if (!res.error) {
        this.solicitacoes = res.data;
      }
    })
  }
}
