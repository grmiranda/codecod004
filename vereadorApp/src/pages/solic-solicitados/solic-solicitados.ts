import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { Solicitacao } from '../../model/solicitacao';

@Component({
  selector: 'page-solic-solicitados',
  templateUrl: 'solic-solicitados.html'
})
export class SolicSolicitadosPage {

  private solicitacoes: Solicitacao[] = [];

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicSolicitadosPage');
  }

}
