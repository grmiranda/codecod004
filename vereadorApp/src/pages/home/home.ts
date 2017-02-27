import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { FacebookService } from '../../providers/facebook-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private facebookService:FacebookService) {
    
  }

  logar(){
    let idFacebook;
    this.facebookService.logar().then(rese=>{
      alert(JSON.stringify(rese));
      idFacebook = rese.id;
    });
  }

  deslogar(){
    this.facebookService.logout();
  }

}
