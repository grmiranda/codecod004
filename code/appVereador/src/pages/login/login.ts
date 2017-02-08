import { Component } from '@angular/core';
import { NavController, NavParams, MenuController} from 'ionic-angular';

import { LoginEmailPage } from '../login-email/login-email';
import { CadastrarUsuarioPage } from '../cadastrar-usuario/cadastrar-usuario';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  cadastrarNovoUser = CadastrarUsuarioPage;
  loginEmail = LoginEmailPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, menu: MenuController,) {
    menu.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
