import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlAndamentoPage } from '../pl-andamento/pl-andamento';
import { PlAprovadosPage } from '../pl-aprovados/pl-aprovados';
import { PlPropostasPage } from '../pl-propostas/pl-propostas';
import { PlRecusadosPage } from '../pl-recusados/pl-recusados';

/*
  Generated class for the TabProjetosDeLei page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tab-projetos-de-lei',
  templateUrl: 'tab-projetos-de-lei.html'
})
export class TabProjetosDeLeiPage {

  tab1Root: any = PlAndamentoPage;
  tab2Root: any = PlPropostasPage;
  tab3Root: any = PlAprovadosPage;
  tab4Root: any = PlRecusadosPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabProjetosDeLeiPage');
  }

}
