import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Solicitacao } from '../../model/solicitacao';

/*
  Generated class for the VisualizarSolicitacao page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-visualizar-solicitacao',
  templateUrl: 'visualizar-solicitacao.html'
})
export class VisualizarSolicitacaoPage {

  private solicitacao:Solicitacao;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      this.solicitacao = navParams.get('solicitacao');
  }

  ionViewDidLoad() {
    
  }

}
