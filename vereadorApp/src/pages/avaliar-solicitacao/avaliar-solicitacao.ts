import { Component } from '@angular/core';
import { ModalController, NavController, ActionSheetController, AlertController, ToastController, LoadingController, MenuController, ViewController, Platform } from 'ionic-angular';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { Solicitacao } from '../../model/solicitacao';
import { PushService } from '../../providers/push-service';
import { FeedBackService } from '../../providers/feed-back-service';
import { EditarSolicitacaoPage } from '../editar-solicitacao/editar-solicitacao';
import { BadgesService } from '../../providers/badges-service';
import { StorageService } from '../../providers/storage';

@Component({
  selector: 'page-avaliar-solicitacao',
  templateUrl: 'avaliar-solicitacao.html'
})
export class AvaliarSolicitacaoPage {

  private solicitacoes: Solicitacao[] = [];

  constructor(
    private toastCtrl: ToastController,
    private platform: Platform,
    public modalCtrl: ModalController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public solicitacaoService: SolicitacaoService,
    public actionSheetCtrl: ActionSheetController,
    private feedService: FeedBackService,
    private viewCtrl: ViewController,
    public badgesService: BadgesService,
    public storageService: StorageService
  ) { }

  ionViewWillEnter() {
    this.carregarSolicitacoes();
    
  }

  private carregarSolicitacoes() {
    this.storageService.get().then(res => {
      this.badgesService.publicar(res.IDUsuario);
    });
    
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
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.feedService.showPromptReprovar(solicitacao.IDUsuario.toString(), solicitacao.Push, this, solicitacao);
          }
        },
        {
          text: 'Aprovar',
          icon: !this.platform.is('ios') ? 'document' : null,
          handler: () => {
            this.feedService.showPromptAprovar(solicitacao.IDUsuario.toString(), solicitacao.Push, this, solicitacao, "Proposta de Solicitação aceita com sucesso");
          }
        },
        {
          text: 'Editar e Aprovar',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.editarSolicitacao(solicitacao);
          }
        },
        {
          text: 'Cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
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

  private editarSolicitacao(solicitacao: Solicitacao) {
    let profileModal = this.modalCtrl.create(EditarSolicitacaoPage, { solicitacao: solicitacao });
    profileModal.onDidDismiss((solicitacaoAtualizada) => {
      if (solicitacaoAtualizada) {
        this.feedService.showPromptAprovar(solicitacaoAtualizada.IDUsuario.toString(), solicitacaoAtualizada.Push, this, solicitacaoAtualizada, "Sua proposta foi modificada para melhor entendimento para os usuários");
      }
    });
    profileModal.present();
  }

  private toggleMenu() {
    this.menuCtrl.toggle();
  }

}
