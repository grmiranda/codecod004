import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { LikeService } from '../../providers/like-service';
import { Like } from '../../model/like';
import { NovaPropostaPage } from '../nova-proposta/nova-proposta';
import { Solicitacao } from '../../model/solicitacao';
import { RequerimentoPage } from '../requerimento/requerimento';

@Component({
  selector: 'page-solic-propostas',
  templateUrl: 'solic-propostas.html'
})
export class SolicPropostasPage {

  private solicitacoes: Solicitacao[] = [];

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

  public novaProposta() {
    this.navCtrl.push(NovaPropostaPage);
  }

  private remover(solicitacao: Solicitacao) {
    solicitacao.estado = 'rc';
    this.solicitacaoService.editSolicitacao(solicitacao).then(res => {
      if (!res.error) {
        //removeu
        this.carregarSolicitacoes();

      } else {
        //rror
      }
    })
  }

  private like(solicitacao: Solicitacao) {
    this.likeService.addLike(new Like('s', solicitacao.IDSolicitacao, solicitacao.IDUsuario)).then(res => {
      if (!res.error && res.value) {
        //works fine
        console.log('works');
      } else if (res.error) {
        //error
      } else {
        console.log('ja curtiu');
      }
    });
  }

  private dislike(solicitacao: Solicitacao) {
    this.likeService.addLike(new Like('n', solicitacao.IDSolicitacao, solicitacao.IDUsuario)).then(res => {
      if (!res.error && res.value) {
        //works fine
        console.log('works');
      } else if (res.error) {
        //error
      } else {
        console.log('ja curtiu');
      }
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
