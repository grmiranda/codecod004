import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { FacebookService } from '../../providers/facebook-service';
import { HomePage } from '../home/home';
import { CadastroPage } from '../cadastro/cadastro';
import { GooglePlusService } from '../../providers/google-plus-service';
import { StorageService } from '../../providers/storage';
import { PushService } from '../../providers/push-service';
import { Usuario } from '../../model/user';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private facebookService: FacebookService,
    private gpService: GooglePlusService,
    private menu: MenuController,
    private storage: StorageService,
    private pushService: PushService
  ) {
    this.menu.enable(false);
    this.storage.get().then(response => {
      if (response.socialID != '') {
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginTeste() {
    let user = new Usuario();
    user.IDUsuario = "1";
    user.cpf = "111.111.111-11";
    user.email = "cleybsonc@gmail.com";
    user.fotoURL = "https://media.licdn.com/media/AAEAAQAAAAAAAAfAAAAAJDk5ZDNhNDI4LTNmOTMtNGI5Yy1iZDIzLTk3NjM1YmVmMTkzNA.jpg";
    user.genero = "male";
    user.nascimento = "2017-01-01";
    user.nome = "Cleybson Cardoso";
    user.permissao = 1;
    user.pontos = 300;
    user.socialID = "102628559883950264990";
    this.adm(user);
    this.storage.set(user);
    this.navCtrl.setRoot(HomePage);

  }


  logarFacebook() {
    this.pushService.getId().then(idPush => {
      this.facebookService.loginFacebook(idPush).then(resposta => {
        if (resposta[0] == "cadastro") {

          this.facebookService.getDados(resposta[1]).then(res => {

            this.navCtrl.setRoot(CadastroPage, { dados: res });
          });

        } else if (resposta[0] == "banido") {
          alert("Conta foi banida do sistema");
        } else if (resposta[0] == "existe") {
          this.adm(resposta[1]);
          this.storage.set(resposta[1]);
          this.navCtrl.setRoot(HomePage);
        }
      });

    });

  }

  adm(user: Usuario) {
    if (user.permissao == 1) {
      this.pushService.addTag("adm");
    }
  }

  logarGoogle() {

    this.pushService.getId().then(idPush => {
      this.gpService.loginGoogle(idPush).then(resposta => {
        if (resposta[0] == "cadastro") {
          this.navCtrl.setRoot(CadastroPage, { dados: this.gpService.getDados() });
        } else if (resposta[0] == "banido") {
          alert("Conta foi banida do sistema");
        } else if (resposta[0] == "existe") {
          this.adm(resposta[1]);
          this.storage.set(resposta[1]);
          this.navCtrl.setRoot(HomePage);

        }
      });
    });
  }

}
