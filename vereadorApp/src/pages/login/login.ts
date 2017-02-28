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
      this.firebaseService.fbLogin(idFacebook).then(result => {
        if(result){
          this.navCtrl.setRoot(HomePage);
        } else {
          this.navCtrl.push(CadastroPage,{facebook: rese});
        }
      })
    });
  }

  deslogar(){
    this.facebookService.logout();
  }

}
