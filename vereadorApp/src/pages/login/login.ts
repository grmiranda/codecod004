import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FacebookService } from '../../providers/facebook-service';
import { FirebaseService } from '../../providers/firebase-service';
import { HomePage } from '../home/home';
import { CadastroPage } from '../cadastro/cadastro';
import { GooglePlusService } from '../../providers/google-plus-service';
import { StorageService } from '../../providers/storage-service';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private facebookService: FacebookService,
    public firebaseService: FirebaseService,
    private gpService: GooglePlusService,
    private storageService : StorageService
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logar() {
    let idFacebook;
    this.facebookService.logar().then(rese => {
      alert(JSON.stringify(rese));
      idFacebook = rese.id;
      this.firebaseService.fbLogin(idFacebook).then(result => {
        if (result) {
          this.navCtrl.setRoot(HomePage);
        } else {
          this.navCtrl.push(CadastroPage, { facebook: rese });
        }
      })
    });
  }

  logarGoogle() {
    this.gpService.loginGoogle().then(resposta=>{
      alert(JSON.stringify(resposta));
      if(resposta=="cadastro"){
        this.navCtrl.setRoot(CadastroPage);
      } else{
        this.storageService.set(resposta);        
        this.navCtrl.setRoot(HomePage);
      }
    })
  }

  deslogar() {
    this.facebookService.logout();
  }

}
