import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Publicacao } from '../../model/publicacao';
import { ShareService } from '../../providers/share-service';
import { CompartilharPage } from '../compartilhar/compartilhar';

@Component({
  selector: 'page-publicacao',
  templateUrl: 'publicacao.html'
})
export class PublicacaoPage {

  public publicacao: Publicacao;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private shareService: ShareService
    ) {
    this.publicacao = this.navParams.get("publicacao");
  }

  compartilhar(){
    alert(JSON.stringify(this.publicacao));
    let popover = this.popoverCtrl.create(CompartilharPage, { titulo:this.publicacao.titulo, subtitulo:this.publicacao.texto, foto:this.publicacao.fotoURL[0] });
    let ev = {
      target: {
        getBoundingClientRect: () => {
          return {
            top: '100'
          };
        }
      }
    };
    popover.present({ ev: event });
    //this.shareService.compartilhar(this.publicacao.titulo, this.publicacao.texto, this.publicacao.fotoURL, null);
  }

}
