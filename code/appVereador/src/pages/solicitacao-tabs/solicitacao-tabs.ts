import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

//paginas
import { AprovadosPage } from '../aprovados/aprovados';
import { RecusadosPage } from '../recusados/recusados';
import { SolicitadosPage } from '../solicitados/solicitados';
import { PropostasPage } from '../propostas/propostas';
/*
  Generated class for the SolicitacaoTabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-solicitacao-tabs',
  templateUrl: 'solicitacao-tabs.html'
})
export class SolicitacaoTabsPage {
  propostas = PropostasPage;
  aprovados = AprovadosPage;
  recusados = RecusadosPage;
  solicitados = SolicitadosPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicitacaoTabsPage');
  }

}
