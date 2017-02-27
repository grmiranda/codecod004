import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/user';
import { User1 } from '../../model/user.1';

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
  private loginFace:User1 = new User1();

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.loginFace = this.navParams.get("facebook");
    this.teste();
    alert(JSON.stringify(this.loginFace));
    this.usuario.nome = this.loginFace.name;
    this.usuario.email = this.loginFace.email;
    this.usuario.genero = this.loginFace.gender;
    this.usuario.fotoURL = this.loginFace.picture;
    this.usuario.fbID = this.loginFace.id;


  }

  teste() {
    console.log("login " + this.loginFace)
    this.loginFace = new User1();
    this.loginFace.name= "jao";
    this.loginFace.email = "joao@joso";
    this.loginFace.gender = "male";
    this.loginFace.picture;
    this.loginFace.id= "fdkjfkdjfkdjk";
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

  cadastrar(){
    if(this.valido()){
      alert("sucesso");
    }else{
      console.log("Deu ruim");
      console.log(this.usuario);
    }
  }

  cancelar(){
    this.navCtrl.pop()
  }



}
