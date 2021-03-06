import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { AdicionarPlPage } from '../adicionar-pl/adicionar-pl';

/*
  Generated class for the AndamentoPL page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-andamento-pl',
  templateUrl: 'andamento-pl.html'
})
export class AndamentoPLPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AndamentoPLPage');
  }

  adicionarPL(){
    this.navCtrl.push(AdicionarPlPage);
  }

}
