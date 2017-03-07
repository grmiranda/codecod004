import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TelefonesPage } from '../telefones/telefones';

/*
  Generated class for the Categorias page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html'
})
export class CategoriasPage {
  private categorias: string[] = ['Delegacias', 'Hospitais', 'Gabinete', 'Prefeitura'];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriasPage');
  }
  getItems(ev: any){

  }
  selecionar(nome: any){
    this.navCtrl.push(TelefonesPage);
  }
}
