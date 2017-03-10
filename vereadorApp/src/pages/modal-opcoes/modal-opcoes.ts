import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the ModalOpcoes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal-opcoes',
  templateUrl: 'modal-opcoes.html'
})
export class ModalOpcoesPage {
  opcoes = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
    this.opcoes = this.navParams.get('opcoes');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalOpcoesPage');
  }

  cancel() {
    this.view.dismiss()
  }

  acao(opcao){
    this.view.dismiss(opcao);
  }
}
