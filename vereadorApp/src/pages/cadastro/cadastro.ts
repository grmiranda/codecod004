import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/user';
import { User1 } from '../../model/user.1';
import { FirebaseService } from '../../providers/firebase-service';
import { HomePage } from '../home/home';

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
  private loginFace;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public firebaseService: FirebaseService) {

    this.loginFace = this.navParams.get("facebook");
    if(this.loginFace == undefined){
      this.teste();
    }
    alert(JSON.stringify(this.loginFace));
    this.usuario.nome = this.loginFace.name;
    this.usuario.email = this.loginFace.email;
    this.usuario.genero = this.loginFace.gender;
    this.usuario.fotoURL = this.loginFace.picture.data.url;
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
      alert("Preencha o campo nome");
      return false;
    } else if (this.usuario.email == "") {
      alert("Preencha o campo email");
      return false;
    } else if (this.usuario.nascimento == "") {
      alert("Preencha o campo nascimento");
      return false;
    } else if (this.usuario.telefone == "") {
      alert("Preencha o campo telefone");
      return false;
    } else if (this.usuario.telefone == "") {
      alert("Preencha o campo telefone");
      return false;
    } else if (this.usuario.bairro == "") {
      alert("Preencha o campo bairro");
      return false;
    } else if (this.usuario.cidade == "") {
      alert("Preencha o campo cidade");
      return false;
    } else if (this.usuario.UF == "") {
      alert("Preencha o campo Estado");
      return false;
    }
    return true;
  }

  cadastrar(){
    if(this.valido()){
      this.firebaseService.cadastrar(this.usuario);
      this.firebaseService.buscarPeloFace(this.usuario).then(result => {
        this.usuario = result;
        this.navCtrl.setRoot(HomePage);
      });
    }else{
      console.log("Deu ruim");
      console.log(this.usuario);
    }
  }

  cancelar(){
    this.navCtrl.pop()
  }



}
