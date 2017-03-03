import { Component } from '@angular/core';
import { ActionSheetController, Platform } from 'ionic-angular';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { Solicitacao } from '../../model/solicitacao';

@Component({
  selector: 'page-avaliar-solicitacao',
  templateUrl: 'avaliar-solicitacao.html'
})
export class AvaliarSolicitacaoPage {

  private solicitacoes: Solicitacao[] = [];

  constructor(public platform: Platform,
    public solicitacaoService: SolicitacaoService,
    public actionSheetCtrl: ActionSheetController) {

  }

  ionViewWillEnter() {
    this.carregarSolicitacoes();
  }

  private carregarSolicitacoes() {
    this.solicitacaoService.getSolicitacoes('sa').then(res => {
      if (!res.error) {
        this.solicitacoes = res.data;
      }
    })
  }

  private aprovar(solicitacao: Solicitacao){
    solicitacao.estado = 'ap';
    this.solicitacaoService.editSolicitacao(solicitacao).then(res=>{
      if(!res.error){
        //editou
        this.carregarSolicitacoes();
      }else{
        //rror
      }
    })
  }

  private reprovar(solicitacao: Solicitacao){
    solicitacao.estado = 'rc';
    this.solicitacaoService.editSolicitacao(solicitacao).then(res=>{
      if(!res.error){
        //editou
      }else{
        //rror
      }
    })
  }

  private abrirOpcoes(solicitacao: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Negar',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.reprovar(solicitacao);
          }
        },
        {
          text: 'Aprovar',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.aprovar(solicitacao);
          }
        },
        {
          text: 'Cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }
}
