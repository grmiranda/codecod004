import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AdicionarPropostaPlPage } from '../adicionar-proposta-pl/adicionar-proposta-pl';
/*
  Generated class for the SolicitacaoPL page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-solicitacao-pl',
  templateUrl: 'solicitacao-pl.html'
})
export class SolicitacaoPLPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicitacaoPLPage');
  }

  adicionarPL(){
    this.navCtrl.push(AdicionarPropostaPlPage);
  }
}
