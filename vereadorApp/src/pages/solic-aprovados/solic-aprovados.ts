import { Component } from '@angular/core';
import { LoadingController, AlertController, NavController, ModalController, ToastController } from 'ionic-angular';
import { RequerimentoService } from '../../providers/requerimento-service';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { Solicitacao } from '../../model/solicitacao';
import { RequerimentoPage } from '../requerimento/requerimento';
import { VisualizarSolicitacaoPage } from '../visualizar-solicitacao/visualizar-solicitacao';

@Component({
  selector: 'page-solic-aprovados',
  templateUrl: 'solic-aprovados.html'
})
export class SolicAprovadosPage {

  private solicitacoes: Solicitacao[] = [];

  constructor(private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private requerimentoService: RequerimentoService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private solicitacaoService: SolicitacaoService,
    private navCtrl: NavController
  ) { }

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
      } else {
        this.showConfirm();
      }
    });
  }

  private abrirSolicitacao(soli: Solicitacao) {
    this.navCtrl.push(VisualizarSolicitacaoPage, { solicitacao: soli })
  }

  private abrirRequerimento(solicitacao: Solicitacao) {
    let modal = this.modalCtrl.create(RequerimentoPage, { solicitacao: solicitacao, operacao: "visualizar" });
    modal.onDidDismiss(data => {
      if (data != undefined) {
        if (solicitacao.andamento != data.andamento) {
          solicitacao.andamento = data.andamento;
          this.editSolicitacao(solicitacao, data.requerimento);
        } else {
          this.editRequerimento(data.requerimento);
        }
      }
    });
    modal.present();
  }

  private editSolicitacao(solicitacao: Solicitacao, requerimento): Promise<boolean> {
    return this.solicitacaoService.editSolicitacao(solicitacao).then(altSol => {
      if (altSol.value) {
        this.editRequerimento(requerimento);
      }
    });
  }

  private editRequerimento(requerimento) {
    this.requerimentoService.editRequerimento(requerimento).then(resReq => {
      if (resReq.value) {
        this.displayToast("Requisição alterada com sucesso");
      } else {
        this.displayToast("erro ao alterar requisição");
      }
    });
  }


  private displayToast(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
