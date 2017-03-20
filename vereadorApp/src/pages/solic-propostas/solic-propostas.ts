import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { LikeService } from '../../providers/like-service';
import { LikeSolicitacao } from '../../model/like-solicitacao';
import { NovaPropostaPage } from '../nova-proposta/nova-proposta';
import { Solicitacao } from '../../model/solicitacao';
import { RequerimentoPage } from '../requerimento/requerimento';

@Component({
  selector: 'page-solic-propostas',
  templateUrl: 'solic-propostas.html'
})
export class SolicPropostasPage {

  private solicitacoes:any = [];

  constructor(public platform: Platform,
    public navCtrl: NavController,
    public solicitacaoService: SolicitacaoService,
    public likeService: LikeService,
    public actionSheetCtrl: ActionSheetController) { }

  ionViewWillEnter() {
    this.carregarSolicitacoes();
  }

  private carregarSolicitacoes() {
    this.solicitacaoService.getSolicitacoes('ap').then(res => {
      if (!res.error) {
        this.solicitacoes = res.data;
      }
    })
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
    this.likeService.addLikeSolicitacao(new LikeSolicitacao(tipo, 18, solicitacao.solicitacao.IDSolicitacao, solicitacao.solicitacao.IDUsuario)).then(res => {
      solicitacao.t = res.value.t;
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
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.remover(solicitacao);
          }
        },
        {
          text: 'Requerimento',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.navCtrl.push(RequerimentoPage, { solicitacao: solicitacao });
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

}
