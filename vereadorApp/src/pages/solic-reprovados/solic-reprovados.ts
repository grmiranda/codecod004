import { Component } from '@angular/core';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { Solicitacao } from '../../model/solicitacao';

@Component({
  selector: 'page-solic-reprovados',
  templateUrl: 'solic-reprovados.html'
})
export class SolicReprovadosPage {

  private solicitacoes: Solicitacao[] = [];

  constructor(public solicitacaoService: SolicitacaoService) { }

  ionViewWillEnter() {
    this.carregarSolicitacoes();
  }

  private carregarSolicitacoes() {
    this.solicitacaoService.getSolicitacoes('cn').then(res => {
      if (!res.error) {
        this.solicitacoes = res.data;
      }
    })
  }

}
