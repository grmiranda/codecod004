import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
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
    private storageService: StorageService,
    public actionSheetCtrl: ActionSheetController
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
      this.mensagemService.getMensagemRecebida(res.IDUsuario).then(res => {
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

  opcoesMsg(mensagem: CorpoMensagem) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Mensagem',
      buttons: [
        {
          text: 'Responder mensagem',

          role: 'destructive',
          icon: 'send',
          handler: () => {
            this.navCtrl.push(EnviarMensagemPage, {destinatario: mensagem.nome, idDestinatario:mensagem.destinatario});
          }
        }, {
          text: 'Excluir',
          icon:'trash',
          handler: () => {
            console.log('Archive clicked');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
