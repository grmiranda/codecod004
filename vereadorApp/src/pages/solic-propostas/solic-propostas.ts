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
import { RequerimentoPage } from '../requerimento/requerimento';
import { NegacaoPage } from '../negacao/negacao';
import { FeedBackService } from '../../providers/feed-back-service';
import { RequerimentoService } from '../../providers/requerimento-service';
import { VisualizarSolicitacaoPage } from '../visualizar-solicitacao/visualizar-solicitacao';

@Component({
  selector: 'page-solic-propostas',
  templateUrl: 'solic-propostas.html'
})
export class SolicPropostasPage {

  private solicitacoes: any[] = [];
  private myID;
  private loading;

  constructor(public platform: Platform,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    public solicitacaoService: SolicitacaoService,
    public storage: StorageService,
    public likeService: LikeService,
    public requerimentoService: RequerimentoService,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    private feedService: FeedBackService
  ) {
  }

  ionViewWillEnter() {
    this.storage.get().then(res => {
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

  private reprovar(solicitacao, motivoNegacao) {
    this.requerimentoService.reprovarRequerimento(motivoNegacao).then(respostaRequerimento => {
      if (respostaRequerimento.value == true) {
        this.displayToast("Negação feita com sucesso");
        solicitacao.estado = "rc";
        this.solicitacaoService.editSolicitacao(solicitacao).then(res => {
          if (!res.error) {
            this.carregarSolicitacoes();
          } else {
            this.displayToast("Erro ao enviar proposta");
          }
        });
      }
      this.loading.dismiss();
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

  private like(solicitacao, tipo: string) {
    solicitacao.t = solicitacao.t == tipo ? 'u' : tipo;
    this.likeService.addLikeSolicitacao(new LikeSolicitacao(tipo, this.myID, solicitacao.solicitacao.IDSolicitacao, solicitacao.solicitacao.IDUsuario)).then(res => {
      solicitacao.p = res.value.p;
      solicitacao.n = res.value.n;
    });
  }


  private abrirOpcoes(solicitacao: Solicitacao) {
    let actionSheet = this.actionSheetCtrl.create({
      title: solicitacao.titulo,
      buttons: [
        {
          text: 'Remover',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            let modal = this.modalCtrl.create(NegacaoPage, { operacao: "novo" });
            modal.onDidDismiss(data => {
              this.loading = this.loadingCtrl.create({
                content: 'Carregando'
              });

              this.loading.present();
              let motivoNegacao = new Negacao();
              if (data != null && data != undefined) {
                motivoNegacao = data.requerimento;
                solicitacao.andamento = data.andamento;
                motivoNegacao.IDSolicitacao = solicitacao.IDSolicitacao;
                motivoNegacao.idUsuarioSolicitacao = solicitacao.IDUsuario;
                let msg = data.msg;
                this.feedService.reprovarVarios(solicitacao.ids, solicitacao.pushs, this, solicitacao, motivoNegacao, msg);
              }
            });
            modal.present();
          }
        },
        {
          text: 'Requerimento',
          icon: 'archive',
          handler: () => {
            let modal = this.modalCtrl.create(RequerimentoPage, { operacao: "novo" });
            modal.onDidDismiss(data => {
              this.loading = this.loadingCtrl.create({
                content: 'Carregando'
              });

              this.loading.present();
              let requerimento = new Requerimento();
              if (data != null && data != undefined) {
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
    this.solicitacaoService.getSolicitacoesPropostas('ap', this.myID).then(res => {
      refresher.complete();
      if (!res.error) {
        this.solicitacoes = res.data;
      } else {
        this.showConfirm();
      }
    });
  }

  private abrirSolicitacao(soli:Solicitacao){
    this.navCtrl.push(VisualizarSolicitacaoPage, {solicitacao: soli} )
  }

}
