import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { Solicitacao } from '../../model/solicitacao';
import { SolicitacaoService } from '../../providers/solicitacao-service';


@Component({
  selector: 'page-solic-solicitados',
  templateUrl: 'solic-solicitados.html'
})
export class SolicSolicitadosPage {

  private solicitacoes: Solicitacao[] = [];


  constructor(public platform: Platform,
    public navCtrl: NavController,
    public solicitacaoService: SolicitacaoService,
    public actionSheetCtrl: ActionSheetController) {

  }

  ionViewWillEnter() {
    this.carregarSolicitacoes();

  }

  private carregarSolicitacoes() {
    this.solicitacaoService.getSolicitacoes('sl').then(res => {
      if (!res.error) {
        this.solicitacoes = res.data;
      }
    })
  }

  private aprovar(solicitacao: Solicitacao){
    solicitacao.estado = 'cp';
    this.solicitacaoService.editSolicitacao(solicitacao).then(res=>{
      if(!res.error){
        //removeu
        this.carregarSolicitacoes();

      }else{
        //rror
      }
    })
  }

  private reprovar(solicitacao: Solicitacao){
    solicitacao.estado = 'cn';
    this.solicitacaoService.editSolicitacao(solicitacao).then(res=>{
      if(!res.error){
        //removeu
        this.carregarSolicitacoes();

      }else{
        //rror
      }
    })
  }

  private abrirOpcoes(solicitacao: Solicitacao) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Reprovar',
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
