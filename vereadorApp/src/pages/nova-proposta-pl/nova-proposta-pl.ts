import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
import { ProjetoDeLeiService } from '../../providers/pl-service';

@Component({
  selector: 'page-nova-proposta-pl',
  templateUrl: 'nova-proposta-pl.html'
})
export class NovaPropostaPlPage {

  private pl: ProjetoDeLei = new ProjetoDeLei();

  constructor(public navCtrl: NavController, public projetoDeLeiService: ProjetoDeLeiService) { }

  private finalizar() {
    this.pl.IDUsuario = 0;
    this.projetoDeLeiService.addProjetoDeLei(this.pl).then(res => {
      if (!res.error && res.value) {
        //works fine
        this.navCtrl.pop();
      } else {
        //error
      }
    });
  }

}
