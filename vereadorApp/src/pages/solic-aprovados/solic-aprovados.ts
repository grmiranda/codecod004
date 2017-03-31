import { Component } from '@angular/core';
import { LoadingController, AlertController, NavController } from 'ionic-angular';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { Solicitacao } from '../../model/solicitacao';
import { VisualizarSolicitacaoPage } from '../visualizar-solicitacao/visualizar-solicitacao';

@Component({
  selector: 'page-solic-aprovados',
  templateUrl: 'solic-aprovados.html'
})
export class SolicAprovadosPage {

  private solicitacoes: Solicitacao[] = [];


  constructor(private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private solicitacaoService: SolicitacaoService,
    private navCtrl: NavController) { }

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
      } else {
        this.showConfirm();
      }
    });
  }

  private showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Falha na conexão',
      message: 'Tentar Novamente ?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Ok',
          handler: () => {
            this.carregarSolicitacoes();
          }
        }
      ]
    });
    confirm.present();
  }

  private doRefresh(refresher) {
    this.solicitacaoService.getSolicitacoes('cp').then(res => {
      refresher.complete();
      if (!res.error) {
        this.solicitacoes = res.data;
      }else{
        this.showConfirm();
      }
    });
  }

  private abrirSolicitacao(soli:Solicitacao){
    this.navCtrl.push(VisualizarSolicitacaoPage, {solicitacao: soli} )
  }

}
