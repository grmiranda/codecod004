import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Depoimento } from '../../model/depoimento';
import { NovoDepoimentoPage } from '../novo-depoimento/novo-depoimento';

@Component({
  selector: 'page-depoimento',
  templateUrl: 'depoimento.html'
})
export class DepoimentoPage {
  private depoimentos: Depoimento[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepoimentoPage');
  }

  public novoDepoimento(){
    this.navCtrl.push(NovoDepoimentoPage);
  }
}
