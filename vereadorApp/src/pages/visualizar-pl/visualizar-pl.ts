import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProjetoDeLei } from '../../model/projeto-de-lei';

/*
  Generated class for the VisualizarPl page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-visualizar-pl',
  templateUrl: 'visualizar-pl.html'
})
export class VisualizarPlPage {

  private pl: ProjetoDeLei;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      this.pl = navParams.get("pl");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisualizarPlPage');
  }

}
