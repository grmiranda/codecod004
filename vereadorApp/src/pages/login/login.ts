import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FacebookService } from '../../providers/facebook-service';
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
    });
  }

  logarGoogle() {
    this.gpService.loginGoogle().then(resposta=>{
      alert(JSON.stringify(resposta));
      if(resposta=="cadastro"){
        this.navCtrl.setRoot(CadastroPage, {dados: this.gpService.getDados()});
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
