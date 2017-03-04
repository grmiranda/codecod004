import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MensagemService } from '../../providers/mensagem-service';
import { StorageService } from '../../providers/storage';
import { ModalAbrirMensagemPage } from '../modal-abrir-mensagem/modal-abrir-mensagem';
import { ModalController } from 'ionic-angular';
import { CorpoMensagem } from '../../model/mensagem';

/*
  Generated class for the MensagensEnviadas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mensagens-enviadas',
  templateUrl: 'mensagens-enviadas.html'
})
export class MensagensEnviadasPage {

  private mensagens;

  constructor(
    public navCtrl: NavController,
    private mensagemService: MensagemService,
    public navParams: NavParams,
    private storageService: StorageService,
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidEnter() {
    this.carregar();
  }

  carregar() {
    this.storageService.get().then(res => {
      this.mensagemService.getMensagemEnviada(res.id).then(res => {
        this.mensagens = res;
      });
    });
  }

  abrirMensagem(mensagemSelecionada: CorpoMensagem) {
    let modal = this.modalCtrl.create(ModalAbrirMensagemPage, { mensagem: mensagemSelecionada });
    modal.present();
  }

}
