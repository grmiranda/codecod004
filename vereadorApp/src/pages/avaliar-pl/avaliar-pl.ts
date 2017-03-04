import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { ProjetoDeLei } from '../../model/projeto-de-lei';

/*
  Generated class for the AvaliarPl page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-avaliar-pl',
  templateUrl: 'avaliar-pl.html'
})
export class AvaliarPlPage {

  public pls: ProjetoDeLei[] = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform) {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaliarPlPage');
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
          text: 'Aprovar',
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
