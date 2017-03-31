import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../model/user';
import { HomePage } from '../home/home';
import { CadastroService } from '../../providers/cadastro-service';
import { LoginPage } from '../login/login';
import { StorageService } from '../../providers/storage';
import { PushService } from '../../providers/push-service';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  private usuario: Usuario = new Usuario();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cadastroService: CadastroService,
    private storage: StorageService,
    private pushService: PushService) {
    this.usuario = this.navParams.get("dados");
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

  private cadastrar() {
    if (this.valido()) {
      this.pushService.getId().then(idPush => {
        this.usuario.Push = idPush;
        this.cadastroService.cadastrar(this.usuario).then(res => {
          if (res == false) {
            alert("Erro ao cadastrar Usuario");
          } else {
            alert(JSON.stringify(res));
            this.storage.set(res);
            this.navCtrl.setRoot(HomePage);
          }
        })
      });
    }
  }

  private cancelar() {
    this.navCtrl.setRoot(LoginPage);
  }
}
