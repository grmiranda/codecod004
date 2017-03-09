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
/*
  Generated class for the EnviarMensagem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-enviar-mensagem',
  templateUrl: 'enviar-mensagem.html'
})
export class EnviarMensagemPage {

  private destinatarios: string;
  private usuarioSelecionado: Usuario[];
  private usuarios: Usuario[] = [];
  public textoMensagem: string = "";

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


    this.pushService.getId().then(res => {
      alert(JSON.stringify(res));
    });
  }

  private inserirDestinatarios(ids: string[]) {
    this.destinatarios = "";
    this.usuarioSelecionado = [];
    for (let i = 0; i < this.destinatarios.length; i++) {
      for (let l = 0; l < this.usuarios.length; l++) {
        if (this.usuarios[l].IDUsuario == this.destinatarios[i]) {
          alert(JSON.stringify(this.usuarios[l]));
          this.usuarioSelecionado.push(this.usuarios[l]);
          this.destinatarios = this.destinatarios + this.usuarios[l].nome + "; ";
        }
      }
    }

    alert(JSON.stringify(this.usuarioSelecionado));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnviarMensagemPage');
  }

  selecionarDestinatario() {
    let modal = this.modalCtrl.create(ModalListaUsuariosPage, { listaUsuarios: this.usuarios });

    modal.onDidDismiss(data => {
      if (data != undefined) {
        this.atribuindoValores(data);
      }

    });
    modal.present();
  }

  private atribuindoValores(data) {

  }

  enviar() {

    


  }

}
