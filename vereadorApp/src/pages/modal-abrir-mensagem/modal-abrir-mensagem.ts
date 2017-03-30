import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-modal-abrir-mensagem',
  templateUrl: 'modal-abrir-mensagem.html'
})
export class ModalAbrirMensagemPage {

  private mensagem: number;

  constructor(public navParams: NavParams, public view: ViewController) {
    this.mensagem = navParams.get('mensagem');
  }

  private cancel() {
    this.view.dismiss();
  }

  private excluir() {
    this.view.dismiss("excluir");
  }
  private enviar() {
    this.view.dismiss("enviar");
  }

}
