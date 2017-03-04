import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ModalListaUsuariosPage } from '../modal-lista-usuarios/modal-lista-usuarios';
import { Usuario } from '../../model/user';
import { BuscaUsuariosService } from '../../providers/busca-usuarios-service';

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

  private destinatario:string;
  private usuarios : Usuario[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public buscarUsers : BuscaUsuariosService) {
    this.destinatario = this.navParams.get('destinatario');
    this.buscarUsers.getUserAll().then(res=>{
      this.usuarios = res;});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnviarMensagemPage');
  }

  selecionarDestinatario(){
    let modal = this.modalCtrl.create(ModalListaUsuariosPage, {listaUsuarios : this.usuarios});

   modal.onDidDismiss(data => {
     this.destinatario = data;
   });
    modal.present();
  }

}
