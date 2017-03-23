import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform, LoadingController, AlertController } from 'ionic-angular';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { LikeService } from '../../providers/like-service';
import { StorageService } from '../../providers/storage';
import { LikeSolicitacao } from '../../model/like-solicitacao';
import { NovaPropostaPage } from '../nova-proposta/nova-proposta';
import { Solicitacao } from '../../model/solicitacao';
import { RequerimentoPage } from '../requerimento/requerimento';

@Component({
  selector: 'page-solic-propostas',
  templateUrl: 'solic-propostas.html'
})
export class SolicPropostasPage {

  private solicitacoes: any[] = [];
  private myID = 8;

  constructor(public platform: Platform,
    public navCtrl: NavController,
    public solicitacaoService: SolicitacaoService,
    public storage: StorageService,
    public likeService: LikeService,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController) {
    }

  ionViewWillEnter() {
    //this.storage.get().then(res => {
    //this.myID = res.IDUsuario;
    this.carregarSolicitacoes();
    //});
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
      }else{
        this.showConfirm();
      }
    });
  }

  private novaProposta() {
    this.navCtrl.push(NovaPropostaPage);
  }

  private remover(solicitacao: Solicitacao) {
    solicitacao.estado = 'rc';
    this.solicitacaoService.editSolicitacao(solicitacao).then(res => {
      if (!res.error) {
        //removeu
        this.carregarSolicitacoes();
      } else {
        //error
      }
    })
  }

  private like(solicitacao, tipo: string) {
    solicitacao.t = solicitacao.t == tipo ? 'u' : tipo;
    this.likeService.addLikeSolicitacao(new LikeSolicitacao(tipo, this.myID, solicitacao.solicitacao.IDSolicitacao, solicitacao.solicitacao.IDUsuario)).then(res => {
      solicitacao.p = res.value.p;
      solicitacao.n = res.value.n;
    });
  }


  private abrirOpcoes(solicitacao: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Remover',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.remover(solicitacao);
          }
        },
        {
          text: 'Requerimento',
          icon: 'archive',
          handler: () => {
            this.navCtrl.push(RequerimentoPage, { solicitacao: solicitacao });
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
      }else{
        this.showConfirm();
      }
    });
  }

}
