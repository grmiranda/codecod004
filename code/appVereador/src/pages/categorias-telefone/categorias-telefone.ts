import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TelefonesUteisPage } from '../telefones-uteis/telefones-uteis';
/*
  Generated class for the CategoriasTelefone page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-categorias-telefone',
  templateUrl: 'categorias-telefone.html'
})
export class CategoriasTelefonePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriasTelefonePage');
  }

  abrir(){
    this.navCtrl.push(TelefonesUteisPage);
  }
}
