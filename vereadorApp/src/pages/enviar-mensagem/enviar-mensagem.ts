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

  private destinatario: string;
  private usuarioSelecionado: Usuario;
  private usuarios: Usuario[] = [];
  public mensagem: CorpoMensagem = new CorpoMensagem();

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
    this.destinatario = this.navParams.get('destinatario');
    this.mensagem.destinatario = this.navParams.get('idDestinatario');

    this.buscarUsers.getUserAll().then(res => {
      this.usuarios = res;
      if (this.mensagem.destinatario != undefined){
        for(let i = 0; i< this.usuarios.length; i ++){
        }
      }
    });
    

      this.pushService.getId().then(res => {
        alert(JSON.stringify(res));
      });
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
    this.usuarioSelecionado = data;
    this.destinatario = data.nome;
    this.mensagem.destinatario = data.id;
  }

  enviar() {

    this.storageService.get().then(res => {
      this.mensagem.remetente = res.IDUsuario;
      if (this.mensagem.mensagem != "" && this.mensagem.destinatario != "") {
        this.mensagemService.enviarMensagem(this.mensagem).then(res => {
          if (res == true) {
            this.pushService.pushUmaPessoa("Nova Mensagem", this.usuarioSelecionado);
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
      alert(JSON.stringify(this.mensagem));

    });


  }

}
