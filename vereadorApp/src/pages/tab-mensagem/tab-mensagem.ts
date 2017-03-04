import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MensagensRecebidasPage } from '../mensagens-recebidas/mensagens-recebidas';
import { MensagensEnviadasPage } from '../mensagens-enviadas/mensagens-enviadas';

/*
  Generated class for the TabMensagem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tab-mensagem',
  templateUrl: 'tab-mensagem.html'
})
export class TabMensagemPage {

  tab1Root: any = MensagensRecebidasPage;
  tab2Root: any = MensagensEnviadasPage;


  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabMensagemPage');
  }

}
