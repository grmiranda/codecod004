import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { EnviarMensagemPage } from '../enviar-mensagem/enviar-mensagem';


/*
  Generated class for the ModalAbrirMensagem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal-abrir-mensagem',
  templateUrl: 'modal-abrir-mensagem.html'
})
export class ModalAbrirMensagemPage {

  private mensagem;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
    this.mensagem = navParams.get('mensagem');
    console.log(this.mensagem);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalAbrirMensagemPage');
  }

  cancel() {
    this.view.dismiss()
  }

  excluir() {
    this.view.dismiss("excluir")
  }
  enviar() {
    this.view.dismiss("enviar")
    this.navCtrl.push(EnviarMensagemPage, { destinatario: this.mensagem.nome, idDestinatario: this.mensagem.destinatario });
  }

}
