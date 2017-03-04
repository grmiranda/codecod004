import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FotoService } from '../../providers/foto-service';
import { ProjetoDeLei } from '../../model/projeto-de-lei';


@Component({
  selector: 'page-nova-pl',
  templateUrl: 'nova-pl.html'
})
export class NovaPlPage {

  private pl: ProjetoDeLei;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private fotoService: FotoService) {
      this.pl = this.navParams.get("pl");
      if(this.pl == undefined){
        this.pl = new ProjetoDeLei();
      }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovaPlPage');
  }

  private finalizar(){

  }


  private importarFoto() {
    this.fotoService.importarFoto().then(url => {
      if (url !== "false") {
        this.pl.fotoURL = url;
      }
    });
  }

  private tirarFoto() {
    this.fotoService.tirarFoto().then(url => {
      if (url !== "false") {
        this.pl.fotoURL = url;
      }
    });
  }
}
