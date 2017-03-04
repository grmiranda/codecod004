import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { ProjetoDeLei } from '../../model/projeto-de-lei';


@Component({
  selector: 'page-pl-propostas',
  templateUrl: 'pl-propostas.html'
})
export class PlPropostasPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform) {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlPropostasPage');
  }

  private novaProposta(){
    //vou dar um push pra tela de nova proposta aqui
  }

  private like(pl: ProjetoDeLei) {
    
  }

  private dislike(pl: ProjetoDeLei) {
    
  }

   private abrirOpcoes(pl: ProjetoDeLei) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Reprovar',
          role: 'destructive',
          handler: () => {
          }
        },
        {
          text: 'Adicionar Projeto de Lei',
          handler: () => {
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
