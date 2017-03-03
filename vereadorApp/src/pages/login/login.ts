import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { FacebookService } from '../../providers/facebook-service';
import { HomePage } from '../home/home';
import { CadastroPage } from '../cadastro/cadastro';
import { GooglePlusService } from '../../providers/google-plus-service';
import { StorageService } from '../../providers/storage';




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
    private storage: StorageService
  ) {
    this.menu.enable(false);
    this.storage.get().then(response => {
      alert(JSON.stringify(response));
      if (response.socialID != '') {
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logarFacebook() {
    this.facebookService.loginFacebook().then(resposta => {
      if (resposta[0] == "cadastro") {

        this.facebookService.getDados(resposta[1]).then(res => {

          this.navCtrl.setRoot(CadastroPage, { dados: res });
        });

      } else if (resposta[0] == "banido") {
        alert("Conta foi banida do sistema");
      } else if (resposta[0] == "existe") {
        alert(resposta[1]);
        this.storage.set(resposta[1]);
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

  logarGoogle() {
    this.gpService.loginGoogle().then(resposta => {
      if (resposta[0] == "cadastro") {
        this.navCtrl.setRoot(CadastroPage, { dados: this.gpService.getDados() });
      } else if (resposta[0] == "banido") {
        alert("Conta foi banida do sistema");
      } else if (resposta[0] == "existe") {
        alert(resposta[1]);
        this.storage.set(resposta[1]);
        this.storage.get().then(response => alert(JSON.stringify(response)));
        this.navCtrl.setRoot(HomePage);
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

}
