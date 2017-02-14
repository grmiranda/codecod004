import { Component } from '@angular/core';
import { NavController, NavParams, MenuController  } from 'ionic-angular';
import { AbrirFeedPage } from '../abrir-feed/abrir-feed';

/*
  Generated class for the BoasVindas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-boas-vindas',
  templateUrl: 'boas-vindas.html'
})
export class BoasVindasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, menu: MenuController) {
    menu.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BoasVindasPage');
  }

  abrirFeed(){
    this.navCtrl.push(AbrirFeedPage);
  }

}
