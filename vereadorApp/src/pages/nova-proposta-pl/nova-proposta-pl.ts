import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProjetoDeLei } from '../../model/projeto-de-lei';

/*
  Generated class for the NovaPropostaPl page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-nova-proposta-pl',
  templateUrl: 'nova-proposta-pl.html'
})
export class NovaPropostaPlPage {

  private pl: ProjetoDeLei = new ProjetoDeLei();

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovaPropostaPlPage');
  }

  private finalizar(){

  }

}
