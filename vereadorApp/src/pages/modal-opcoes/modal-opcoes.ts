import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-modal-opcoes',
  templateUrl: 'modal-opcoes.html'
})
export class ModalOpcoesPage {

  private opcoes = [];

  constructor(public navParams: NavParams, public view: ViewController) {
    this.opcoes = this.navParams.get('opcoes');
  }

  private cancel() {
    this.view.dismiss()
  }

  private acao(opcao) {
    this.view.dismiss(opcao);
  }
}
