import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the AvaliarDepoimento page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-avaliar-depoimento',
  templateUrl: 'avaliar-depoimento.html'
})
export class AvaliarDepoimentoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaliarDepoimentoPage');
  }

}
