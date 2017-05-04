import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Usuario } from '../../model/user';

@Component({
  selector: 'page-modal-lista-usuarios',
  templateUrl: 'modal-lista-usuarios.html'
})
export class ModalListaUsuariosPage {

  private listaUsuarios: Usuario[] = [];
  private useraux: Usuario[] = [];
  private searchQuery: string = '';
  private usuariosSelecionados: Usuario[] = [];
  private selecionando: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public view: ViewController
    ) {
    this.listaUsuarios = navParams.get('listaUsuarios');
    this.usuariosSelecionados = navParams.get('usuariosSelecionados');
    if (this.usuariosSelecionados == undefined) {
      this.usuariosSelecionados = [];
    } else {
      this.selecionando = true;
    }
    this.initializeItems();
  }

  corBackground(usuarioAtual: Usuario) {
    if (!this.selecionando) {
      return '#ffffff';
    } if (this.usuariosSelecionados.indexOf(usuarioAtual) != -1) {
      return '#0066ff';
    } else {
      return '#ffffff';
    }
  }

  iniciarSelecao(usuarioSelecionado: Usuario) {
    this.selecionando = true;
    this.usuariosSelecionados.push(usuarioSelecionado);
  }

  selecionarUser(usuarioSelecionado: Usuario) {

    if (!this.selecionando) {
      let usuarios = []
      usuarios.push(usuarioSelecionado.IDUsuario);
      this.view.dismiss(usuarios);

    } else {

      let index = this.usuariosSelecionados.indexOf(usuarioSelecionado);
      if (index == -1) {
        this.usuariosSelecionados.push(usuarioSelecionado);
      } else {
        this.usuariosSelecionados.splice(index, 1);
        if (this.usuariosSelecionados.length == 0) {
          this.selecionando = false;
        }
      }

    }
  }

  limparSelecao() {
    this.selecionando = false;
    this.usuariosSelecionados = [];
  }

  confirmarSelecoes() {
    let ids = [];
    for(let i = 0; i < this.usuariosSelecionados.length; i++){
      ids.push(this.usuariosSelecionados[i].IDUsuario);
    }
    this.view.dismiss(ids);
  }

  initializeItems() {
    this.useraux = this.listaUsuarios;
  }
  cancel() {
    this.view.dismiss()
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
