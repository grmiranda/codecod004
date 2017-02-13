import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AndamentoPLPage } from '../andamento-pl/andamento-pl';
import { SolicitacaoPLPage } from '../solicitacao-pl/solicitacao-pl';
import { AprovadosPlPage } from '../aprovados-pl/aprovados-pl';
/*
  Generated class for the PlTabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pl-tabs',
  templateUrl: 'pl-tabs.html'
})
export class PlTabsPage {
  propostas = SolicitacaoPLPage;
  aprovados = AprovadosPlPage;
  //recusados = RecusadosPage;
  emAndamento = AndamentoPLPage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlTabsPage');
  }

}
