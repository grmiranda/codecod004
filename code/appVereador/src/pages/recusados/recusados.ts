import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Recusados page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recusados',
  templateUrl: 'recusados.html'
})
export class RecusadosPage {
  propostas = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.inicializarItens();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecusadosPage');
  }

  inicializarItens() {
    this.propostas = [];
    this.propostas.push({
      titulo: "Asfaltamento",
      descricao: "Asfaltar rua",
      texto: 'Texto descrevendo o porque de ser recusado' ,
      data: '20/02/2017',
      foto: "../../imagens/ruaEsburacada.jpg",
      bairro: "Centenário",
      rua: "Sem Nome",
      apoios: 10,
      apoiada: false
    });
    this.propostas.push({
      titulo: "Reparos",
      descricao: "Concertar Poste",
      texto: 'Texto descrevendo o porque de ser recusado' ,
      data: '20/02/2017',
      foto: "../../imagens/posteQueimado.png",
      bairro: "Santa Mônica",
      rua: "Sem Nome",
      apoios: 2,
      apoiada: true

    });
    this.propostas.push({
      titulo: "Contrução",
      descricao: "Construir UPA",
      texto: 'Texto descrevendo o porque de ser recusado' ,
      data: '20/02/2017',
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

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.propostas = this.propostas.filter((item) => {
        return (item.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

  }
}
