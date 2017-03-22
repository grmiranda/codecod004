import { Component } from '@angular/core';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
import { ProjetoDeLeiService } from '../../providers/pl-service';

@Component({
  selector: 'page-pl-aprovados',
  templateUrl: 'pl-aprovados.html'
})
export class PlAprovadosPage {

  private pls: ProjetoDeLei[] = [];

  constructor(public projetoDeLeiService: ProjetoDeLeiService) { }

  ionViewWillEnter() {
    this.carregarPropostas();
  }

  private carregarPropostas() {
    this.projetoDeLeiService.getProjetosDeLei('cp').then(res => {
      if (!res.error) {
        this.pls = res.data;
      }
    });
  }

  private doRefresh(refresher) {
    this.projetoDeLeiService.getProjetosDeLei('cp').then(res => {
      refresher.complete();
      if (!res.error) {
        this.pls = res.data;
      }
    });
  }
}
