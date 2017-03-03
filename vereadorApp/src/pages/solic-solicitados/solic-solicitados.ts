import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the SolicSolicitados page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-solic-solicitados',
  templateUrl: 'solic-solicitados.html'
})
export class SolicSolicitadosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
 //   this.carregarSolicitacoes();
  }
/** 
  private carregarSolicitacoes() {
    this.solicitacaoService.getSolicitacoes('sl').then(res => {
      if (!res.error) {
        this.solicitacoes = res.data;
      }
    })
  }
*/
}
