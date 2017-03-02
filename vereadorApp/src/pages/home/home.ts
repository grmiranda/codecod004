import { Component } from '@angular/core';
import { NovaPublicacaoPage } from '../nova-publicacao/nova-publicacao';
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

  public novaPublicacao(){
    this.navCtrl.push(NovaPublicacaoPage);
  }

}
