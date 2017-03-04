import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ModalListaUsuariosPage } from '../modal-lista-usuarios/modal-lista-usuarios';
import { Usuario } from '../../model/user';
import { BuscaUsuariosService } from '../../providers/busca-usuarios-service';
import { CorpoMensagem } from '../../model/mensagem';
import { StorageService } from '../../providers/storage';
import { MensagemService } from '../../providers/mensagem-service';
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

  private destinatario: string;
  private usuarios: Usuario[] = [];
  public mensagem: CorpoMensagem = new CorpoMensagem();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public buscarUsers: BuscaUsuariosService,
    private storageService: StorageService,
    private mensagemService: MensagemService,
    private toastCtrl: ToastController
  ) {
    this.destinatario = this.navParams.get('destinatario');
    this.buscarUsers.getUserAll().then(res => {
      this.usuarios = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnviarMensagemPage');
  }

  selecionarDestinatario() {
    let modal = this.modalCtrl.create(ModalListaUsuariosPage, { listaUsuarios: this.usuarios });

    modal.onDidDismiss(data => {
      if (data != undefined) {
        this.destinatario = data.nome;
        this.mensagem.destinatario = data.id;
      }

    });
    modal.present();
  }

  enviar() {

    this.storageService.get().then(res => {
      this.mensagem.remetente = res.id;
    });
    if (this.mensagem.mensagem != "" && this.mensagem.destinatario != "") {
      this.mensagemService.enviarMensagem(this.mensagem).then(res => {
        if (res == true) {
          let toast = this.toastCtrl.create({
            message: 'Mensagem enviada com sucesso',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          this.navCtrl.pop()
        }
      })

    }
  }

}
