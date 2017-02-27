import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { FacebookService } from '../../providers/facebook-service';
import { FirebaseService } from '../../providers/firebase-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, 
    private facebookService:FacebookService,
    public firebaseService: FirebaseService) {
    
  }


}
