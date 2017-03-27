import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { LikeService } from '../../providers/like-service';
import { StorageService } from '../../providers/storage';
import { LikeSolicitacao } from '../../model/like-solicitacao';
import { NovaPropostaPage } from '../nova-proposta/nova-proposta';
import { Solicitacao } from '../../model/solicitacao';
import { RequerimentoPage } from '../requerimento/requerimento';
import { FeedBackService } from '../../providers/feed-back-service';

@Component({
  selector: 'page-solic-propostas',
  templateUrl: 'solic-propostas.html'
})
export class SolicPropostasPage {

  private solicitacoes: any[] = [];
  private myID;

  constructor(public platform: Platform,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    public solicitacaoService: SolicitacaoService,
    public storage: StorageService,
    public likeService: LikeService,
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

    let loading = this.loadingCtrl.create({
      content: 'Carregando'
    });

    loading.present();

    this.solicitacaoService.getSolicitacoesPropostas('ap', this.myID).then(res => {
      loading.dismiss();
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
    solicitacao.estado = 'rc';
    this.solicitacaoService.editSolicitacao(solicitacao).then(res => {
      if (!res.error) {
        this.carregarSolicitacoes();
      } else {

        //error
      }
    });
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
            this.feedService.showPromptReprovarVarios(solicitacao.ids, solicitacao.pushs, this, solicitacao);
          }
        },
        {
          text: 'Requerimento',
          icon: 'archive',
          handler: () => {
            let modal = this.modalCtrl.create(RequerimentoPage, { solicitacao: solicitacao });
            modal.onDidDismiss(data => {
              console.log(data);
              if (data != null && data != undefined) {
              }
            });
            modal.present();
            //this.navCtrl.push(RequerimentoPage, { solicitacao: solicitacao });
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

}
