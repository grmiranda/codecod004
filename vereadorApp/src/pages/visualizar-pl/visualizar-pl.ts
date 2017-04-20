import { Component } from '@angular/core';
import { NavParams, PopoverController, LoadingController } from 'ionic-angular';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
import { CompartilharPage } from '../compartilhar/compartilhar';
import { ProjetoDeLeiService } from '../../providers/pl-service';

@Component({
  selector: 'page-visualizar-pl',
  templateUrl: 'visualizar-pl.html'
})
export class VisualizarPlPage {

  private pl: ProjetoDeLei;

  constructor(
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    private plService: ProjetoDeLeiService
  ) {
    this.pl = navParams.get("pl");
    if (this.pl.titulo == "") {
      let loading = this.loadingCtrl.create({
        content: 'Carregando'
      });
      loading.present();
      this.plService.plGetId(this.pl.IDPL).then(res => {
        loading.dismiss();
        this.pl = res.data;
      }).catch(() => loading.dismiss());
    }
  }

  compartilhar() {
    let popover = this.popoverCtrl.create(CompartilharPage, { titulo: this.pl.titulo, subtitulo: this.pl.ementa, foto: this.pl.fotoURL[0], tipo: "pl", id: this.pl.IDPL });
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
