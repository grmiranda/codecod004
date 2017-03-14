import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SolicAprovadosPage } from '../solic-aprovados/solic-aprovados';
import { SolicPropostasPage } from '../solic-propostas/solic-propostas';
import { SolicSolicitadosPage } from '../solic-solicitados/solic-solicitados';
import { SolicReprovadosPage } from '../solic-reprovados/solic-reprovados';

/*
  Generated class for the Solicitacoes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-solicitacoes',
  templateUrl: 'solicitacoes.html'
})
export class SolicitacoesPage {
  tab1Root: any = SolicPropostasPage;
  tab2Root: any = SolicSolicitadosPage;
  tab3Root: any = SolicAprovadosPage;
  tab4Root: any = SolicReprovadosPage

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

}
