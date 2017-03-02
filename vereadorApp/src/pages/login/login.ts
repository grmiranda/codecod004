import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { FacebookService } from '../../providers/facebook-service';
import { HomePage } from '../home/home';
import { CadastroPage } from '../cadastro/cadastro';
import { GooglePlusService } from '../../providers/google-plus-service';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private facebookService: FacebookService,
    private gpService: GooglePlusService,
    private menu: MenuController
  ) {
    this.menu.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logarFacebook() {
    this.facebookService.loginFacebook().then(resposta => {
      if (resposta == "cadastro") {
        this.navCtrl.setRoot(CadastroPage, { dados: this.facebookService.getDados() });
      } else if (resposta == "banido") {
        alert("Conta foi banida do sistema");
      } else if (resposta.socialID != "" && resposta.socialID != undefined) {

        this.navCtrl.setRoot(HomePage);
      }
    })
  }

  logarGoogle() {
    this.gpService.loginGoogle().then(resposta => {
      if (resposta == "cadastro") {
        this.navCtrl.setRoot(CadastroPage, { dados: this.gpService.getDados() });
      } else if (resposta == "banido") {
        alert("Conta foi banida do sistema");
      } else if (resposta.socialID != "" && resposta.socialID != undefined) {

        this.navCtrl.setRoot(HomePage);
      }
    });
  }

}
