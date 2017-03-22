import { Component } from '@angular/core';
import { ActionSheetController, Platform } from 'ionic-angular';
import { ProjetoDeLeiService } from '../../providers/pl-service';
import { ProjetoDeLei } from '../../model/projeto-de-lei';

@Component({
  selector: 'page-avaliar-pl',
  templateUrl: 'avaliar-pl.html'
})
export class AvaliarPlPage {

  public pls: ProjetoDeLei[] = [];

  constructor(public projetoDeLeiService: ProjetoDeLeiService,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform) { }

  ionViewWillEnter() {
    this.carregarPropostas();
  }

  private carregarPropostas() {
    this.projetoDeLeiService.getProjetosDeLei('sa').then(res => {
      if (!res.error) {
        this.pls = res.data;
      }
    })
  }

  private aprovar(pl: ProjetoDeLei) {
    pl.estado = 'ap';
    this.projetoDeLeiService.editProjetoDeLei(pl).then(res => {
      if (!res.error && res.value) {
        //works fine
        this.carregarPropostas();
      } else {
        //error
      }
    });
  }

  private reprovar(pl: ProjetoDeLei) {
    pl.estado = 'pr';
    this.projetoDeLeiService.editProjetoDeLei(pl).then(res => {
      if (!res.error && res.value) {
        //works fine
        this.carregarPropostas();
      } else {
        //error
      }
    });
  }

  private abrirOpcoes(pl: ProjetoDeLei) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Reprovar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.reprovar(pl);
          }
        },
        {
          text: 'Aprovar',
          icon: 'document',
          handler: () => {
            this.aprovar(pl);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

}
