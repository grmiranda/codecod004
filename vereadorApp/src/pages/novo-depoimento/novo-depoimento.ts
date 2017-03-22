import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the NovoDepoimento page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-novo-depoimento',
  templateUrl: 'novo-depoimento.html'
})
export class NovoDepoimentoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovoDepoimentoPage');
  }

  public enviar(){
    
  }
}
