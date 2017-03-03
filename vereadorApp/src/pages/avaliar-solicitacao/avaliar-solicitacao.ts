import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, MenuController, Platform } from 'ionic-angular';
import { Solicitacao } from '../../model/solicitacao';

/*
  Generated class for the AvaliarSolicitacao page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-avaliar-solicitacao',
  templateUrl: 'avaliar-solicitacao.html'
})
export class AvaliarSolicitacaoPage {

  private solicitacoes: Solicitacao[] = [];

  constructor(public platform: Platform,
  public navCtrl: NavController, 
  public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController, 
    public menu:MenuController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaliarSolicitacaoPage');
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
