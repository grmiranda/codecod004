import { Component } from '@angular/core';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { Solicitacao } from '../../model/solicitacao';

@Component({
  selector: 'page-solic-aprovados',
  templateUrl: 'solic-aprovados.html'
})
export class SolicAprovadosPage {

  private solicitacoes: Solicitacao[] = [];

  constructor(public solicitacaoService: SolicitacaoService) { }


}
