import { Component } from '@angular/core';
<<<<<<< HEAD
import { NavController, NavParams, Platform, ActionSheetController  } from 'ionic-angular';
=======
import { SolicitacaoService } from '../../providers/solicitacao-service';
>>>>>>> 6de24f86865ea27e76e7635a0dfa9aafb48d1c45
import { Solicitacao } from '../../model/solicitacao';

@Component({
  selector: 'page-solic-reprovados',
  templateUrl: 'solic-reprovados.html'
})
export class SolicReprovadosPage {

  private solicitacoes: Solicitacao[] = [];
<<<<<<< HEAD
  
  constructor(public platform: Platform,
  public navCtrl: NavController, 
  public navParams: NavParams,
  public actionSheetCtrl: ActionSheetController) {}
=======

  constructor(public solicitacaoService: SolicitacaoService) { }

  ionViewWillEnter() {
    this.carregarSolicitacoes();
  }
>>>>>>> 6de24f86865ea27e76e7635a0dfa9aafb48d1c45

  private carregarSolicitacoes() {
    this.solicitacaoService.getSolicitacoes('cn').then(res => {
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
          text: 'Remover',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {

          }
        },
        {
          text: 'Requerimento',
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
