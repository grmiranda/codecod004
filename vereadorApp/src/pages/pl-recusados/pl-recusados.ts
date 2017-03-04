import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProjetoDeLei } from '../../model/projeto-de-lei';


@Component({
  selector: 'page-pl-recusados',
  templateUrl: 'pl-recusados.html'
})
export class PlRecusadosPage {

  private pls: ProjetoDeLei[] = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlRecusadosPage');
  }

}
