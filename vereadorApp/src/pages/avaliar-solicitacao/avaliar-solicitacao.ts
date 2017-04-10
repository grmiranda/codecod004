import { Component } from '@angular/core';
import { ModalController, NavController, ActionSheetController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { Solicitacao } from '../../model/solicitacao';
import { PushService } from '../../providers/push-service';
import { FeedBackService } from '../../providers/feed-back-service';
import { VisualizarSolicitacaoPage } from '../visualizar-solicitacao/visualizar-solicitacao';
import { EditarSolicitacaoPage } from '../editar-solicitacao/editar-solicitacao';


@Component({
  selector: 'page-avaliar-solicitacao',
  templateUrl: 'avaliar-solicitacao.html'
})
export class AvaliarSolicitacaoPage {

  private solicitacoes: Solicitacao[] = [];

  constructor(
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public solicitacaoService: SolicitacaoService,
    public actionSheetCtrl: ActionSheetController,
    private feedService: FeedBackService
  ) { }

  ionViewWillEnter() {
    this.carregarSolicitacoes();
  }

  private carregarSolicitacoes() {

    let loading = this.loadingCtrl.create({
      content: 'Carregando'
    });

    loading.present();

    this.solicitacaoService.getSolicitacoes('sa').then(res => {
      loading.dismiss();
      if (!res.error) {
        this.solicitacoes = res.data;
      }
    }).catch(() => loading.dismiss());
  }


  public aprovar(solicitacao: Solicitacao) {
    solicitacao.estado = 'ap';
    this.solicitacaoService.editSolicitacao(solicitacao).then(res => {
      if (!res.error) {
        this.displayToast('Solicitação Aprovada');
        this.carregarSolicitacoes();
      } else {
        this.showConfirm(1, solicitacao);
      }
    });
  }

  public reprovar(solicitacao: Solicitacao) {
    this.solicitacaoService.delSolicitacao(solicitacao).then(res => {
      if (!res.error) {
        this.displayToast('Solicitação Reprovada');
        this.carregarSolicitacoes();
      } else {
        this.showConfirm(2, solicitacao);
      }
    });
  }

  private abrirOpcoes(solicitacao: Solicitacao) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Negar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.feedService.showPromptReprovar(solicitacao.IDUsuario.toString(), solicitacao.Push, this, solicitacao);
          }
        },
        {
          text: 'Aprovar',
          icon: 'document',
          handler: () => {
            this.feedService.showPromptAprovar(solicitacao.IDUsuario.toString(), solicitacao.Push, this, solicitacao, "Proposta de Solicitação aceita com sucesso");
          }
        },
        {
          text: 'Editar e Aprovar',
          icon: 'create',
          handler: () => {
            this.editarSolicitacao(solicitacao);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });

    actionSheet.present();
  }

  private displayToast(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

  private showConfirm(tipo: number, solicitacao: Solicitacao) {
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
            if (tipo == 1) {
              this.aprovar(solicitacao);
            } else if (tipo == 2) {
              this.reprovar(solicitacao);
            }
          }
        }
      ]
    });
    confirm.present();
  }

  private doRefresh(refresher) {
    this.solicitacaoService.getSolicitacoes('sa').then(res => {
      refresher.complete();
      if (!res.error) {
        this.solicitacoes = res.data;
      }
    });
  }

  private abrirSolicitacao(solicitacao:Solicitacao){
    this.navCtrl.push(VisualizarSolicitacaoPage, {solicitacao: solicitacao} )
  }

  private editarSolicitacao(solicitacao: Solicitacao) {
    let profileModal = this.modalCtrl.create(EditarSolicitacaoPage, { solicitacao: solicitacao });
    profileModal.onDidDismiss((solicitacaoAtualizada) => {
      if(solicitacaoAtualizada){
        this.feedService.showPromptAprovar(solicitacaoAtualizada.IDUsuario.toString(), solicitacaoAtualizada.Push, this, solicitacaoAtualizada, "Sua proposta foi modificada para melhor entendimento para os usuarios");
        this.carregarSolicitacoes();
      }
    });
    profileModal.present();
  }

}
