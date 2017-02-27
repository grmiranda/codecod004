import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/user';

/*
  Generated class for the Cadastro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  private usuario: User = new User();


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    let loginFace = this.navParams.get("facebook");
    alert(JSON.stringify(loginFace));
    this.usuario.nome = loginFace.name;
    this.usuario.email = loginFace.email;
    this.usuario.genero = loginFace.gender;
    this.usuario.fotoURL = loginFace.picture;
    this.usuario.fbID = loginFace.id;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  private valido(): boolean {
    if (this.usuario.nome == "") {
      return false;
    } else if (this.usuario.email == "") {
      return false;
    } else if (this.usuario.nascimento == "") {
      return false;
    } else if (this.usuario.telefone == "") {
      return false;
    } else if (this.usuario.endereco == "") {
      return false;
    } else if (this.usuario.bairro == "") {
      return false;
    } else if (this.usuario.cidade == "") {
      return false;
    } else if (this.usuario.UF == "") {
      return false;
    }
    return true;
  }



}
