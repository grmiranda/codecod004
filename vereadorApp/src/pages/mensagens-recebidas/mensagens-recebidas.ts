import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EnviarMensagemPage } from '../enviar-mensagem/enviar-mensagem';
import { MensagemService } from '../../providers/mensagem-service';
import { StorageService } from '../../providers/storage';
import { CorpoMensagem } from '../../model/mensagem';
import { ModalController } from 'ionic-angular';
import { ModalAbrirMensagemPage } from '../modal-abrir-mensagem/modal-abrir-mensagem';
/*
  Generated class for the MensagensRecebidas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mensagens-recebidas',
  templateUrl: 'mensagens-recebidas.html'
})
export class MensagensRecebidasPage {

  private mensagens;

  constructor(
    public navCtrl: NavController,
    private mensagemService: MensagemService,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private storageService: StorageService
  ) {

  }

  ionViewDidEnter() {
    this.carregar();
  }

  enviarMensagem() {
    this.navCtrl.push(EnviarMensagemPage);
  }

  carregar() {
    this.storageService.get().then(res => {
      this.mensagemService.getMensagemRecebida(res.id).then(res => {
        this.mensagens = res;
      });
    });
  }

  private doRefresh(refresher) {
    this.carregar();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  lida(mensagem: CorpoMensagem) {
    if (mensagem.lida == 0) {
      return true;
    } else {
      return false;
    }
  }

  abrirMensagem(mensagemSelecionada: CorpoMensagem) {
    if (mensagemSelecionada.lida == 0) {
      this.mensagemService.ler(mensagemSelecionada.id);
    }
    mensagemSelecionada.lida = 1;
    let modal = this.modalCtrl.create(ModalAbrirMensagemPage, { mensagem: mensagemSelecionada });
    modal.present();
  }

}
