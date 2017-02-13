import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SolicitacaoTabsPage } from '../solicitacao-tabs/solicitacao-tabs';

/*
  Generated class for the AdicionarSolicitacao page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-adicionar-solicitacao',
  templateUrl: 'adicionar-solicitacao.html'
})
export class AdicionarSolicitacaoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionarSolicitacaoPage');
  }
  adicionar(){
    this.navCtrl.pop();
  }
  cancelar(){
    this.navCtrl.pop();
  }
}
