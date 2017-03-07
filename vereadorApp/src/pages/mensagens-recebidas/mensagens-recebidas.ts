import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { EnviarMensagemPage } from '../enviar-mensagem/enviar-mensagem';
import { MensagemService } from '../../providers/mensagem-service';
import { StorageService } from '../../providers/storage';
import { CorpoMensagem } from '../../model/mensagem';
import { ModalController } from 'ionic-angular';
import { ModalAbrirMensagemPage } from '../modal-abrir-mensagem/modal-abrir-mensagem';
import { Usuario } from '../../model/user';
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

  private mensagens: CorpoMensagem[];
  private selecao: boolean = false;
  private mensagensSelecionadas: CorpoMensagem[] = [];

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

    /* this.storageService.get().then(res => {
       this.mensagemService.getMensagemRecebida(res.IDUsuario).then(res => {
         this.mensagens = res;
       });
     });
     */

    this.mensagemService.getMensagemRecebida("1").then(res => {
      this.mensagens = res;
    });

  }

  private doRefresh(refresher) {
    this.carregar();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  lida(mensagem: CorpoMensagem) {
    if (!this.selecao) {
      if (mensagem.lida == 0) {
        return '#ed9e1e';
      } else {
        return '#ffffff';
      }
    } if (this.mensagensSelecionadas.indexOf(mensagem) != -1) {
      return '#0066ff';
    } else {
      return '#ffffff';
    }
  }

  abrirMensagem(mensagemSelecionada: CorpoMensagem) {

    if (!this.selecao) {
      if (mensagemSelecionada.lida == 0) {
        this.mensagemService.ler(mensagemSelecionada.id);
      }
      mensagemSelecionada.lida = 1;
      let modal = this.modalCtrl.create(ModalAbrirMensagemPage, { mensagem: mensagemSelecionada });
      modal.present();
    } else {
      let index = this.mensagensSelecionadas.indexOf(mensagemSelecionada);
      if (index == -1) {
        this.mensagensSelecionadas.push(mensagemSelecionada);
      } else{
        this.mensagensSelecionadas.splice(index, 1);
      }
    }
    if(this.mensagensSelecionadas.length==0){
      this.selecao = false;
    }
  }

  opcoesMsg(mensagem: CorpoMensagem) {
    this.selecao = true;
    this.mensagensSelecionadas.push(mensagem);
    /*
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
    */
  }

}
