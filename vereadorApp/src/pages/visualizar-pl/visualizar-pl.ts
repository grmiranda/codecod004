import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ProjetoDeLei } from '../../model/projeto-de-lei';

@Component({
  selector: 'page-visualizar-pl',
  templateUrl: 'visualizar-pl.html'
})
export class VisualizarPlPage {

  private pl: ProjetoDeLei;

  constructor(public navParams: NavParams) {
      this.pl = navParams.get("pl");
  }

}
