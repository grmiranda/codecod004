import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-historia',
  templateUrl: 'historia.html'
})
export class HistoriaPage {

  constructor(private menuCtrl: MenuController) {}

  private toggleMenu(){
    this.menuCtrl.toggle();
  }

}
