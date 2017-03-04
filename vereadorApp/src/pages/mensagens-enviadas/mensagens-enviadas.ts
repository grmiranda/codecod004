import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { MensagemService } from '../../providers/mensagem-service';
import { StorageService } from '../../providers/storage';
import { ModalAbrirMensagemPage } from '../modal-abrir-mensagem/modal-abrir-mensagem';
import { ModalController } from 'ionic-angular';
import { CorpoMensagem } from '../../model/mensagem';
import { EnviarMensagemPage } from '../enviar-mensagem/enviar-mensagem';


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
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController
  ) {
  }

  ionViewDidEnter() {
    this.carregar();
  }

  carregar() {
    this.storageService.get().then(res => {
      this.mensagemService.getMensagemEnviada(res.IDUsuario).then(res => {
        this.mensagens = res;
      });
    });
  }

  abrirMensagem(mensagemSelecionada: CorpoMensagem) {
    let modal = this.modalCtrl.create(ModalAbrirMensagemPage, { mensagem: mensagemSelecionada });
    modal.present();
  }

  opcoesMsg(mensagem: CorpoMensagem) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Mensagem',
      buttons: [
        {
          text: 'Enviar mensagem',

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
