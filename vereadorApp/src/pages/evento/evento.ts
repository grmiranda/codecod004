import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditarEventoPage } from '../editar-evento/editar-evento';
/*
  Generated class for the Evento page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html'
})
export class EventoPage {

  private evento:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.evento = this.navParams.get("evento");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventoPage');
  }

  public editar(){
    this.navCtrl.push(EditarEventoPage, {evento: this.evento});
  }

}
