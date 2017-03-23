import { Component } from '@angular/core';
import { ActionSheetController, Platform, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { MensagemService } from '../../providers/mensagem-service';
import { StorageService } from '../../providers/storage';
import { Solicitacao } from '../../model/solicitacao';
import { CorpoMensagem } from '../../model/mensagem';
import { PushService } from '../../providers/push-service';
import { FeedBackService } from '../../providers/feed-back-service';


@Component({
  selector: 'page-avaliar-solicitacao',
  templateUrl: 'avaliar-solicitacao.html'
})
export class AvaliarSolicitacaoPage {

  private solicitacoes: Solicitacao[] = [];

  constructor(private platform: Platform,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public solicitacaoService: SolicitacaoService,
    private mensagemService: MensagemService,
    private storageService: StorageService,
    public actionSheetCtrl: ActionSheetController,
    private pushService: PushService,
    private feedService : FeedBackService 
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
    });
  }


  private aprovar(solicitacao: Solicitacao) {
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

  private reprovar(solicitacao: Solicitacao) {
    solicitacao.estado = 'rc';
    this.solicitacaoService.editSolicitacao(solicitacao).then(res => {
      if (!res.error) {
        this.displayToast('Solicitação Reprovada');
      } else {
        this.showConfirm(2, solicitacao);
      }
    })
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
            this.reprovar(solicitacao);
          }
        },
        {
          text: 'Aprovar',
          icon: 'document',
          handler: () => {
            this.feedService.showPrompt(solicitacao.IDUsuario.toString(), solicitacao.Push, this, solicitacao);            
            //this.showPrompt(solicitacao);
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

<<<<<<< HEAD
  private showPrompt(solicitacao: Solicitacao) {
    return this.alertCtrl.create({
      title: 'Mensagem para usuario',
      message: "Digite uma mensagem para o usuario",
      inputs: [
        {
          name: 'mensagem',
          placeholder: 'Digite aqui'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            this.displayToast("Avaliação cancelada");
          }
        },
        {
          text: 'Save',
          handler: data => {
            /*
            let mensagemEnviar = new CorpoMensagem();
            mensagemEnviar.mensagem = data.mensagem;
            mensagemEnviar.destinatario = solicitacao.IDUsuario.toString();
            //this.storageService.get().then(res=>mensagemEnviar.remetente = res.IDUsuario);
            mensagemEnviar.remetente = "1";
            this.mensagemService.enviarMensagem(mensagemEnviar).then(res => {
              if (res == true) {
                this.aprovar(solicitacao);
                this.pushService.pushUmaPessoa("Nova mensagem", solicitacao.push);
              }
            });
            */
          }
        }
      ]
    }).present();
  }

  

=======
  private doRefresh(refresher) {
    this.solicitacaoService.getSolicitacoes('sa').then(res => {
      refresher.complete();
      if (!res.error) {
        this.solicitacoes = res.data;
      }
    });
  }

>>>>>>> e0ca1ce49b05f4830d5b3e5f85a57d5297aa3660
}
