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

  private abrirOpcoes(solicitacao: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Reprovar',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {

          }
        },
        {
          text: 'Aprovar',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            
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
