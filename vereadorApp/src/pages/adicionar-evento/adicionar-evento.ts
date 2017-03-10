import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the AdicionarEvento page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-adicionar-evento',
  templateUrl: 'adicionar-evento.html'
})
export class AdicionarEventoPage {
  private evento = {
    Titulo: '',
    Descricao: '',
    DataInicio: null,
    DataFim: null,
    Allday: false,
    HoraInicio: null,
    HoraFim : null
  }

  

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionarEventoPage');
  }
  
  adicionar(){
    this.navCtrl.pop();
  }

}
