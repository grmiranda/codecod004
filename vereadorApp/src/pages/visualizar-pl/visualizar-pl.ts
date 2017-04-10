import { Component } from '@angular/core';
import { NavParams, PopoverController } from 'ionic-angular';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
import { CompartilharPage } from '../compartilhar/compartilhar';

@Component({
  selector: 'page-visualizar-pl',
  templateUrl: 'visualizar-pl.html'
})
export class VisualizarPlPage {

  private pl: ProjetoDeLei;

  constructor(
    public navParams: NavParams,
    public popoverCtrl: PopoverController
  ) {
    this.pl = navParams.get("pl");
  }

  compartilhar() {
    let popover = this.popoverCtrl.create(CompartilharPage, { titulo: this.pl.titulo, subtitulo: this.pl.ementa, foto: this.pl.fotoURL[0] });
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
  }

}
