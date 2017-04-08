import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { LikeService } from '../../providers/like-service';
import { StorageService } from '../../providers/storage';
import { LikeSolicitacao } from '../../model/like-solicitacao';
import { NovaPropostaPage } from '../nova-proposta/nova-proposta';
import { Solicitacao } from '../../model/solicitacao';
import { Requerimento } from '../../model/requerimento';
import { Negacao } from '../../model/negacao';
import { Usuario } from '../../model/user';
import { RequerimentoPage } from '../requerimento/requerimento';
import { NegacaoPage } from '../negacao/negacao';
import { FeedBackService } from '../../providers/feed-back-service';
import { RequerimentoService } from '../../providers/requerimento-service';
import { VisualizarSolicitacaoPage } from '../visualizar-solicitacao/visualizar-solicitacao';
import { EditarSolicitacaoPage } from '../editar-solicitacao/editar-solicitacao';

@Component({
  selector: 'page-solic-propostas',
  templateUrl: 'solic-propostas.html'
})
export class SolicPropostasPage {

  private solicitacoes: any[] = [];
  private myID;
  private loading;
  private meuUser: Usuario;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    public solicitacaoService: SolicitacaoService,
    public storageS: StorageService,
    public likeService: LikeService,
    public requerimentoService: RequerimentoService,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    private feedService: FeedBackService
  ) {
    this.storageS.get().then(resUser => this.meuUser = resUser);
  }

  ionViewWillEnter() {
    this.storageS.get().then(res => {
      this.myID = res.IDUsuario;
      this.carregarSolicitacoes();
    });
  }

  private carregarSolicitacoes() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando'
    });
    this.loading.present();
    this.solicitacaoService.getSolicitacoesPropostas('ap', this.myID).then(res => {
      this.loading.dismiss();
      if (!res.error) {
        this.solicitacoes = res.data;
      } else {
        this.showConfirm();
      }
    });
  }

  private novaProposta() {
    this.navCtrl.push(NovaPropostaPage);
  }

  private reprovar(solicitacao: Solicitacao) {
    this.solicitacaoService.delSolicitacao(solicitacao).then(res => {
      if (!res.error) {
        this.displayToast("Negação feita com sucesso");
        this.carregarSolicitacoes();
      } else {
        this.displayToast("Erro ao negar proposta");
      }
      this.loading.dismiss();
    }).catch(() => this.loading.dismiss());
  }


  private displayToast(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  private like(solicitacao, tipo: string) {
    solicitacao.t = solicitacao.t == tipo ? 'u' : tipo;
    this.likeService.addLikeSolicitacao(new LikeSolicitacao(tipo, this.myID, solicitacao.solicitacao.IDSolicitacao, solicitacao.solicitacao.IDUsuario)).then(res => {
      solicitacao.p = res.value.p;
      solicitacao.n = res.value.n;
    });
  }


  private abrirOpcoes(solicitacao: Solicitacao) {
    if (this.meuUser.permissao == 1) {
      let actionSheet = this.actionSheetCtrl.create({
        title: solicitacao.titulo,
        buttons: [
          {
            text: 'Remover',
            role: 'destructive',
            icon: 'trash',
            handler: () => {
              this.enviarMensagem(solicitacao);//abre o alert para o usuario dizer o motivo da reprovação da publicacao
            }
          },
          {
            text: 'Requerimento',
            icon: 'archive',
            handler: () => {
              let modal = this.modalCtrl.create(RequerimentoPage, { operacao: "novo" });
              modal.onDidDismiss(data => {
                let requerimento = new Requerimento();
                if (data != null && data != undefined) {
                  this.loading = this.loadingCtrl.create({
                    content: 'Carregando'
                  });
                  this.loading.present();
                  requerimento = data.requerimento;
                  solicitacao.andamento = data.andamento;
                  requerimento.IDSolicitacao = solicitacao.IDSolicitacao;
                  requerimento.idUsuarioSolicitacao = solicitacao.IDUsuario;
                  let msg = data.msg;

                  this.feedService.confirmarVariosRequerimento(solicitacao.ids, solicitacao.pushs, this, solicitacao, requerimento, msg);
                }
              });
              modal.present();
            }
          },
          {
            text: 'Editar',
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
  }

  private editarSolicitacao(solicitacao: Solicitacao) {
    let profileModal = this.modalCtrl.create(EditarSolicitacaoPage, { solicitacao: solicitacao });
    profileModal.onDidDismiss((solicitacaoAtualizada) => {
      this.solicitacaoService.editSolicitacao(solicitacaoAtualizada).then(res =>
        this.carregarSolicitacoes());
    });
    profileModal.present();
  }

  public enviarMensagem(solicitacao: Solicitacao) {
    this.alertCtrl.create({
      title: 'Motivo de negação',
      message: "Digite mensagem para usuario",
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
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            //envia o feedback para os usuários
            this.feedService.reprovarVarios(solicitacao.ids, solicitacao.pushs, this, solicitacao, data.mensagem);
          }
        }]
    }).present();
  }

  private confirmado(solicitacao, requerimento) {
    this.requerimentoService.addRequerimento(requerimento).then(respostaRequerimento => {
      if (respostaRequerimento.value == true) {
        this.displayToast("requerimento feito com sucesso");
        solicitacao.estado = "sl";
        this.solicitacaoService.editSolicitacao(solicitacao).then(res => {
          if (!res.error) {
            this.carregarSolicitacoes();
          } else {
            this.displayToast("Erro ao enviar proposta");
          }
        });
      }
      this.loading.dismiss();
    }).catch(() => this.loading.dismiss());
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
    this.solicitacaoService.getSolicitacoesPropostas('ap', this.myID).then(res => {
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
}
