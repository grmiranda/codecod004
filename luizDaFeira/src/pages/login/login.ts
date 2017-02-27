import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FacebookService } from '../../providers/facebook-service';
import { User } from '../model/user';
import { CadastroPage } from '../cadastro/cadastro';
import { HomePage } from '../home/home';
import { FirebaseService } from '../../providers/firebase-service';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fbService: FacebookService,
    public fireService: FirebaseService) {

  }

  ionViewDidLoad() {
  }

  private loginFacebook(): void {
    this.fbService.logar();
  }

}
