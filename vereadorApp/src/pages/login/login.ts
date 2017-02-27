import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FacebookService } from '../../providers/facebook-service';
import { FirebaseService } from '../../providers/firebase-service';
import { HomePage } from '../home/home';
import { CadastroPage } from '../cadastro/cadastro';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private facebookService:FacebookService,
    public firebaseService: FirebaseService) {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logar(){
    let idFacebook;
    this.facebookService.logar().then(rese=>{
      alert(JSON.stringify(rese));
      idFacebook = rese.id;
      if(this.firebaseService.fbLogin(idFacebook)){
        //vai para o app direto
        this.navCtrl.setRoot(HomePage);
      } else {
        //vai para cadastro
        this.navCtrl.push(CadastroPage, {facebook: rese});
      }
    });
  }

  deslogar(){
    this.facebookService.logout();
  }

}
