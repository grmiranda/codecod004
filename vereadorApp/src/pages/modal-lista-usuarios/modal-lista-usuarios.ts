import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the ModalListaUsuarios page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal-lista-usuarios',
  templateUrl: 'modal-lista-usuarios.html'
})
export class ModalListaUsuariosPage {

  private listaUsuarios;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view : ViewController) {
    this.listaUsuarios = navParams.get('listaUsuarios');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalListaUsuariosPage');
  }

  cancel(){
    this.view.dismiss()
  }

  selecionar(user){
    this.view.dismiss(user);
  }

}
