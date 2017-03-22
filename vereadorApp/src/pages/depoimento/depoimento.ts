import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Depoimento } from '../../model/depoimento';
import { NovoDepoimentoPage } from '../novo-depoimento/novo-depoimento';
import { DepoimentoService } from '../../providers/depoimento-service';

@Component({
  selector: 'page-depoimento',
  templateUrl: 'depoimento.html'
})
export class DepoimentoPage {
  private depoimentos: Depoimento[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private depoimentoService: DepoimentoService) {
    this.carregar();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepoimentoPage');
  }

  carregar(){
    this.depoimentoService.getDepoimentoAprovados().then(depoi=>{
      this.depoimentos = depoi;
    });
  }

  public novoDepoimento(){
    this.navCtrl.push(NovoDepoimentoPage);
  }
}
