import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Usuario } from '../../model/user';

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

  private listaUsuarios: Usuario[] = [];
  private useraux: Usuario[] =[];
  private searchQuery: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public view : ViewController) {
    this.listaUsuarios = navParams.get('listaUsuarios');
    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalListaUsuariosPage');
  }

  initializeItems() {
    this.useraux = this.listaUsuarios;
  }
  cancel(){
    this.view.dismiss()
  }

  selecionar(user){
    this.view.dismiss(user);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.useraux = this.useraux.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
