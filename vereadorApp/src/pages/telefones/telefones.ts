import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Categorias } from '../../model/categoriasTelefone';
import { CallNumber } from 'ionic-native';

/*
  Generated class for the Telefones page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-telefones',
  templateUrl: 'telefones.html'
})
export class TelefonesPage {

  private categoria: Categorias;
  private instituicao;
  private auxInstituicao;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.categoria = this.navParams.get("categoria");
    this.instituicao = this.categoria.instituicao;
    this.auxInstituicao = this.instituicao;
    this.initializeItems();
  }

  ionViewDidLoad() {

  }
  initializeItems() {
    this.instituicao = this.auxInstituicao;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.instituicao = this.instituicao.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  ligar(telefoneInstituicao: string) {
    console.log(telefoneInstituicao);
    let numero = telefoneInstituicao.replace("(", "");
    numero = numero.replace(")", "");
    numero = numero.replace(" ", "");
    numero = numero.replace("-", "");
    CallNumber.callNumber(numero, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));

  }

}
