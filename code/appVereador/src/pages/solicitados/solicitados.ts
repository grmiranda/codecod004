import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AdicionarSolicitacaoPage } from '../adicionar-solicitacao/adicionar-solicitacao';

/*
  Generated class for the Solicitados page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-solicitados',
  templateUrl: 'solicitados.html'
})
export class SolicitadosPage {
  propostas = [];
  filtro: string = "descricao";
  addSolicitacao = AdicionarSolicitacaoPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.inicializarItens();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicitadosPage');
  }

  inicializarItens() {
    this.propostas = [];
    this.propostas.push({
      descricao: "Construção do posto de saude",
      foto: "../../imagens/postoSaude.jpg",
      bairro: "Centenário",
      rua: "Sem Nome",
      apoios: 10,
      apoiada: false
    });
    this.propostas.push({
      descricao: "Reforma do posto policial",
      foto: null,
      bairro: "Ponto Central",
      rua: "getúlio Vargas",
      apoios: 40,
      apoiada: false
    });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.inicializarItens();

    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.propostas = this.propostas.filter((item) => {
        return (item.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

  }
  adicionarSolicitacao(){
    this.navCtrl.push(this.addSolicitacao);
  }
}
