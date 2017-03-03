import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FotoService } from '../../providers/foto-service';
import { Solicitacao } from '../../model/solicitacao';

@Component({
  selector: 'page-nova-proposta',
  templateUrl: 'nova-proposta.html'
})
export class NovaPropostaPage {

  private solicitacao: Solicitacao = new Solicitacao();

  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public fotoService: FotoService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovaPropostaPage');
  }

  private importarFoto() {
  }

  private tirarFoto() {
  }

  private requisitar(){

  }
}
