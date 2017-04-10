import { Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController, AlertController } from 'ionic-angular';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { Solicitacao } from '../../model/solicitacao';
import { VisualizarSolicitacaoPage } from '../visualizar-solicitacao/visualizar-solicitacao';

@Component({
  selector: 'page-solic-reprovados',
  templateUrl: 'solic-reprovados.html'
})
export class SolicReprovadosPage {

  private solicitacoes: Solicitacao[] = [];


  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public solicitacaoService: SolicitacaoService) { }

  ionViewWillEnter() {
    this.carregarSolicitacoes();
  }

  private carregarSolicitacoes() {

    let loading = this.loadingCtrl.create({
      content: 'Carregando'
    });

    loading.present();

    this.solicitacaoService.getSolicitacoes('cn').then(res => {
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
    this.solicitacaoService.getSolicitacoes('cn').then(res => {
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
