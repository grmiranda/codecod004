import { Component } from '@angular/core';
import { NovaPublicacaoPage } from '../nova-publicacao/nova-publicacao';
import { NavController } from 'ionic-angular';
import { PublicacaoService } from '../../providers/publicacao-service';
import { Publicacao } from '../../model/publicacao';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private publicacoes: Publicacao[] = [];

  constructor(public navCtrl: NavController, private publicacaoService: PublicacaoService) {

    this.carregarFeed();
  }

  private carregarFeed() {
    this.publicacaoService.getPublicacoes().then(res => {
      if (!res.error) {
        this.publicacoes = res.data;
      } else {
        //ocorreu um error
      }
    });
  }

  private novaPublicacao() {
    this.navCtrl.push(NovaPublicacaoPage);
  }

}
