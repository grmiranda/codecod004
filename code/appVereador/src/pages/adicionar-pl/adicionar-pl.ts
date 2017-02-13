import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PlTabsPage } from '../pl-tabs/pl-tabs';

/*
  Generated class for the AdicionarPl page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-adicionar-pl',
  templateUrl: 'adicionar-pl.html'
})
export class AdicionarPlPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionarPlPage');
  }

  adicionar(){
    this.navCtrl.pop();
  }
  cancelar(){
    this.navCtrl.pop();
  }
}
