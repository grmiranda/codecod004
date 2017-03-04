import { Component } from '@angular/core';
<<<<<<< HEAD
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the SolicSolicitados page.
=======
import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { Solicitacao } from '../../model/solicitacao';
import { SolicitacaoService } from '../../providers/solicitacao-service';
>>>>>>> c99546c86aa439e960a69dee830c6492fcf305ad

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-solic-solicitados',
  templateUrl: 'solic-solicitados.html'
})
export class SolicSolicitadosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

<<<<<<< HEAD
  ionViewDidLoad() {
 //   this.carregarSolicitacoes();
=======

  constructor(public navCtrl: NavController, public solicitacaoService: SolicitacaoService) { 
    
  }

  ionViewWillEnter() {
    this.carregarSolicitacoes();
>>>>>>> c99546c86aa439e960a69dee830c6492fcf305ad
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
