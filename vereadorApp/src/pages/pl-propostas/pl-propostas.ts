import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
import { NovaPropostaPlPage } from '../nova-proposta-pl/nova-proposta-pl';
import { NovaPlPage } from '../nova-pl/nova-pl';


@Component({
  selector: 'page-pl-propostas',
  templateUrl: 'pl-propostas.html'
})
export class PlPropostasPage {

  public pls: ProjetoDeLei[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform) {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlPropostasPage');
  }

  private novaProposta(){
    this.navCtrl.push(NovaPropostaPlPage);
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
            this.navCtrl.push(NovaPlPage, {pl: pl});
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
