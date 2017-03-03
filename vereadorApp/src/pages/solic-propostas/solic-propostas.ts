import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NovaPropostaPage } from '../nova-proposta/nova-proposta';

/*
  Generated class for the SolicPropostas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-solic-propostas',
  templateUrl: 'solic-propostas.html'
})
export class SolicPropostasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicPropostasPage');
  }

  public novaProposta(){
    this.navCtrl.push(NovaPropostaPage);
  }
}
