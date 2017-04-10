import { Component } from '@angular/core';
import { NavController, PopoverController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { EnviarMensagemPage } from '../enviar-mensagem/enviar-mensagem';
import { MensagemService } from '../../providers/mensagem-service';
import { StorageService } from '../../providers/storage';
import { CorpoMensagem } from '../../model/mensagem';
import { ModalController } from 'ionic-angular';
import { ModalAbrirMensagemPage } from '../modal-abrir-mensagem/modal-abrir-mensagem';
import { ModalOpcoesPage } from '../modal-opcoes/modal-opcoes';
import { Usuario } from '../../model/user';

@Component({
  selector: 'page-mensagens-enviadas',
  templateUrl: 'mensagens-enviadas.html'
})
export class MensagensEnviadasPage {

  private mensagens: CorpoMensagem[] = [];
  private selecao: boolean = false;
  private mensagensSelecionadas: CorpoMensagem[] = [];
  private meuUser: Usuario;

  constructor(
    public navCtrl: NavController,
    private mensagemService: MensagemService,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private storageService: StorageService,
    public popoverCtrl: PopoverController,
    private toastCtrl: ToastController
  ) {
    this.storageService.get().then(res => this.meuUser);

  }

  ionViewDidEnter() {
    this.storageService.get().then(res => {
      this.meuUser = res;
      this.carregar();
    });

  }

  private carregar() {

    let loading = this.loadingCtrl.create({
      content: 'Carregando'
    });

    loading.present();

    this.selecao = false;
    this.mensagemService.getMensagemEnviada(this.meuUser.IDUsuario).then(res => {
      loading.dismiss();
      if (res) {
        this.mensagens = res;
        this.mensagensSelecionadas = [];
      } else {
        this.tentarNovamente();
      }
    });

  }

  private corBackground(mensagem: CorpoMensagem) {
    if (!this.selecao) {
      return '#ffffff';
    } if (this.mensagensSelecionadas.indexOf(mensagem) != -1) {
      return '#0066ff';
    } else {
      return '#ffffff';
    }
  }

  private abrirMensagem(mensagemSelecionada: CorpoMensagem) {
    if (!this.selecao) {
      let modal = this.modalCtrl.create(ModalAbrirMensagemPage, { mensagem: mensagemSelecionada });
      modal.onDidDismiss(data => {
        if (data == "excluir") {
          this.excluirMsg(mensagemSelecionada.id);
        } else if (data == "enviar") {
          let usuariosMensagens = [];
          usuariosMensagens.push(mensagemSelecionada.IDOutro);
          this.navCtrl.push(EnviarMensagemPage, { usuariosSelecionado: usuariosMensagens });
        }
      });
      modal.present();
    } else {
      let index = this.mensagensSelecionadas.indexOf(mensagemSelecionada);
      if (index == -1) {
        this.mensagensSelecionadas.push(mensagemSelecionada);
      } else {
        this.mensagensSelecionadas.splice(index, 1);
        if (this.mensagensSelecionadas.length == 0) {
          this.selecao = false;
        }
      }
    }
  }

  private excluirMsg(id) {
    this.mensagemService.deletar(this.meuUser.IDUsuario, id).then(res => {
      if (res == true) {
        this.carregar();
        let toast = this.toastCtrl.create({
          message: 'Mensagem apagada com sucesso',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    });
  }

  private opcoesMsg(mensagem: CorpoMensagem) {
    this.selecao = true;
    this.mensagensSelecionadas.push(mensagem);
  }

  private openOptions(event: any) {
    let popover = this.popoverCtrl.create(ModalOpcoesPage, { opcoes: ['Responder', 'Excluir'] });
    let ev = {
      target: {
        getBoundingClientRect: () => {
          return {
            top: '10'
          };
        }
      }
    };

    popover.onDidDismiss(data => {
      if (data != null) {
        if (data == "Excluir") {
          for (let i = 0; i < this.mensagensSelecionadas.length; i++) {
            this.excluirMsg(this.mensagensSelecionadas[i].id);
          }
          this.carregar();
        } else if ("Responder") {
          let usuariosMensagens = [];
          for (let i = 0; i < this.mensagensSelecionadas.length; i++) {
            usuariosMensagens.push(this.mensagensSelecionadas[i].IDOutro);
          }
          this.navCtrl.push(EnviarMensagemPage, { usuariosSelecionado: usuariosMensagens });
        }
      }
    });
    popover.present({ ev: event });
  }

  private cancelarSelecoes() {
    this.selecao = false;
    this.mensagensSelecionadas = [];
  }

  private tentarNovamente() {
    let confirm = this.alertCtrl.create({
      title: 'Falha na conexão',
      message: 'Tentar Novamente ?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Ok',
          handler: () => {
            this.carregar();
          }
        }
      ]
    });
    confirm.present();
  }

  private doRefresh(refresher) {
    this.carregar();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

}
