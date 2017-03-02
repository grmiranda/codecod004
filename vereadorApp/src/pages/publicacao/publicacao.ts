import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Publicacao } from '../../model/publicacao';

/*
  Generated class for the Publicacao page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-publicacao',
  templateUrl: 'publicacao.html'
})
export class PublicacaoPage {

  public publicacao: Publicacao;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.publicacao = this.navParams.get("publicacao");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicacaoPage');
  }

}
