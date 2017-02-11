import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the AdicionarProposta page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-adicionar-proposta',
  templateUrl: 'adicionar-proposta.html'
})
export class AdicionarPropostaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionarPropostaPage');
  }

  adicionar(){
    this.navCtrl.pop();
  }
}
