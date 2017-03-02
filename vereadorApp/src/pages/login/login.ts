import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    private gpService: GooglePlusService
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logar() {
    this.facebookService.logar().then(rese => {
    });
  }

  logarGoogle() {
    this.gpService.loginGoogle().then(resposta=>{
      alert(JSON.stringify(resposta));
      if(resposta=="cadastro"){
        this.navCtrl.setRoot(CadastroPage, {dados: this.gpService.getDados()});
      } else{
      
        this.navCtrl.setRoot(HomePage);
      }
    })
  }

  deslogar() {
    this.facebookService.logout();
  }

}
