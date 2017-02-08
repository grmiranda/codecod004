import { Component } from '@angular/core';
import { NavController, NavParams , MenuController} from 'ionic-angular';

//paginas
import { AprovadosPage } from '../aprovados/aprovados';
import { RecusadosPage } from '../recusados/recusados';
import { SolicitadosPage } from '../solicitados/solicitados';
import { PropostasPage } from '../propostas/propostas';

/*
  Generated class for the InicioTabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-inicio-tabs',
  templateUrl: 'inicio-tabs.html'
})
export class InicioTabsPage {
  propostas = PropostasPage;
  aprovados = AprovadosPage;
  recusados = RecusadosPage;
  solicitados = SolicitadosPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, menu: MenuController) {
    menu.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioTabsPage');
  }

}
