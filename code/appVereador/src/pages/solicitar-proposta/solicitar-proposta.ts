import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the SolicitarProposta page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-solicitar-proposta',
  templateUrl: 'solicitar-proposta.html'
})
export class SolicitarPropostaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicitarPropostaPage');
  }
  adicionar(){
    this.navCtrl.pop();
  }
}
