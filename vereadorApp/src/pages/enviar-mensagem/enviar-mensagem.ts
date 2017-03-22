import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ModalListaUsuariosPage } from '../modal-lista-usuarios/modal-lista-usuarios';
import { Usuario } from '../../model/user';
import { BuscaUsuariosService } from '../../providers/busca-usuarios-service';
import { CorpoMensagem } from '../../model/mensagem';
import { StorageService } from '../../providers/storage';
import { MensagemService } from '../../providers/mensagem-service';
import { PushService } from '../../providers/push-service';

@Component({
  selector: 'page-enviar-mensagem',
  templateUrl: 'enviar-mensagem.html'
})
export class EnviarMensagemPage {

  private destinatarios: string;
  private usuarioSelecionado: Usuario[];
  private usuarios: Usuario[] = [];
  public textoMensagem: string = "";
  private enviando: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public buscarUsers: BuscaUsuariosService,
    private storageService: StorageService,
    private mensagemService: MensagemService,
    private toastCtrl: ToastController,
    private pushService: PushService
  ) {

    let destinatariosTelaAnterior = this.navParams.get('usuariosSelecionado');
    this.buscarUsers.getUserAll().then(res => {
      this.usuarios = res;
      if (destinatariosTelaAnterior != undefined) {
        this.inserirDestinatarios(destinatariosTelaAnterior);
      }
    });
  }

  private inserirDestinatarios(ids: string[]) {
    this.destinatarios = "";
    this.usuarioSelecionado = [];
    for (let i = 0; i < ids.length; i++) {
      for (let l = 0; l < this.usuarios.length; l++) {
        if (this.usuarios[l].IDUsuario == ids[i] && this.usuarioSelecionado.indexOf(this.usuarios[l]) == -1) {
          this.usuarioSelecionado.push(this.usuarios[l]);
          this.destinatarios = this.destinatarios + this.usuarios[l].nome + "; ";
        }
      }
    }
  }

  private selecionarDestinatario() {
    let modal = this.modalCtrl.create(ModalListaUsuariosPage, { listaUsuarios: this.usuarios, usuariosSelecionados: this.usuarioSelecionado });

    modal.onDidDismiss(data => {
      if (data != undefined) {
        this.inserirDestinatarios(data);
      }

    });
    modal.present();
  }

  private enviar() {
    this.enviando = true;
    let tudoEnviado = true;
    this.storageService.get().then(res => {
      for (let i = 0; i < this.usuarioSelecionado.length; i++) {
        let mensagemEnviar = new CorpoMensagem();
        mensagemEnviar.destinatario = this.usuarioSelecionado[i].IDUsuario;
        mensagemEnviar.remetente = res.IDUsuario;
        mensagemEnviar.mensagem = this.textoMensagem;
        this.mensagemService.enviarMensagem(mensagemEnviar).then(res => {
          if (res == true) {
            let toast = this.toastCtrl.create({
              message: 'Mensagem enviada com sucesso',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            this.pushService.pushUmaPessoa("Nova mensagem", this.usuarioSelecionado[i]);
          } else {
            tudoEnviado = false;
            alert("Erro ao enviar mensagem para " + this.usuarioSelecionado[i].nome);
          }
        });
      }
    });

    if (tudoEnviado) {
      this.navCtrl.popAll();
    } else {
      this.enviando = false;
    }
  }

}
