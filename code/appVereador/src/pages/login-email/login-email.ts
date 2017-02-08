import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EsqueciSenhaPage } from '../esqueci-senha/esqueci-senha';
import { InicioTabsPage } from '../inicio-tabs/inicio-tabs';
/*
  Generated class for the LoginEmail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login-email',
  templateUrl: 'login-email.html'
})
export class LoginEmailPage {
  email: string = '';
  senha: string = '';
  esqueciSenha = EsqueciSenhaPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginEmailPage');
  }
  login(){
    this.navCtrl.setRoot(InicioTabsPage);
  }
}
