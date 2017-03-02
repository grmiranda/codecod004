import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../model/user';
import { HomePage } from '../home/home';
import { CadastroService } from '../../providers/cadastro-service';
import { LoginPage } from '../login/login';

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

  private usuario: Usuario = new Usuario();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cadastroService: CadastroService
  ) {

    this.usuario = this.navParams.get("dados");

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
    } else if (this.usuario.bairro == "") {
      alert("Preencha o campo bairro");
      return false;
    } else if (this.usuario.genero == "") {
      alert("Preencha o campo Sexo");
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


  cadastrar() {
    this.cadastroService.cadastrar(this.usuario).then(res => {
      if (res == false) {
        alert("Erro ao cadastrar Usuario");
      } else{ 
        alert(JSON.stringify(res));
        this.navCtrl.setRoot(HomePage);
      }

    })
  }

  cancelar() {
    this.navCtrl.setRoot(LoginPage);
  }



}