import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { FacebookService } from '../../providers/facebook-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  array = [{nome: "hahah"},{nome: "huehue"}];

  constructor(public navCtrl: NavController, 
    private facebookService:FacebookService) {
    
  }


}
