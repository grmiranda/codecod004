import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ActionSheetController  } from 'ionic-angular';
import { Solicitacao } from '../../model/solicitacao';

@Component({
  selector: 'page-solic-reprovados',
  templateUrl: 'solic-reprovados.html'
})
export class SolicReprovadosPage {

  private solicitacoes: Solicitacao[] = [];
  
  constructor(public platform: Platform,
  public navCtrl: NavController, 
  public navParams: NavParams,
  public actionSheetCtrl: ActionSheetController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicReprovadosPage');
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
