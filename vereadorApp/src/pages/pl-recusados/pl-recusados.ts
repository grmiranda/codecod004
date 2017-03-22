import { Component } from '@angular/core';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
import { ProjetoDeLeiService } from '../../providers/pl-service';


@Component({
  selector: 'page-pl-recusados',
  templateUrl: 'pl-recusados.html'
})
export class PlRecusadosPage {

  private pls: ProjetoDeLei[] = [];

  constructor(public projetoDeLeiService: ProjetoDeLeiService) { }

  ionViewWillEnter() {
    this.carregarPropostas();
  }

  private carregarPropostas() {
    this.projetoDeLeiService.getProjetosDeLei('cn').then(res => {
      if (!res.error) {
        this.pls = res.data;
      }
    });
  }

  private doRefresh(refresher) {
    this.projetoDeLeiService.getProjetosDeLei('cn').then(res => {
      refresher.complete();
      if (!res.error) {
        this.pls = res.data;
      }
    });
  }
}
