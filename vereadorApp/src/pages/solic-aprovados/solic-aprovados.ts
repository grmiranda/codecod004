import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { Solicitacao } from '../../model/solicitacao';

@Component({
  selector: 'page-solic-aprovados',
  templateUrl: 'solic-aprovados.html'
})
export class SolicAprovadosPage {

  private solicitacoes: Solicitacao[] = [];


  constructor(private loadingCtrl: LoadingController, private solicitacaoService: SolicitacaoService) { }

  ionViewWillEnter() {
    this.carregarSolicitacoes();
  }

  private carregarSolicitacoes() {

    let loading = this.loadingCtrl.create({
      content: 'Carregando'
    });

    loading.present();

    this.solicitacaoService.getSolicitacoes('cp').then(res => {
      loading.dismiss();
      if (!res.error) {
        this.solicitacoes = res.data;
      }
    });
  }

  private doRefresh(refresher) {
    this.solicitacaoService.getSolicitacoes('cp').then(res => {
      refresher.complete();
      if (!res.error) {
        this.solicitacoes = res.data;
      }
    });
  }

}
