import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform  } from 'ionic-angular';
import { ProjetoDeLeiService } from '../../providers/pl-service';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
import { NovaPlPage } from '../nova-pl/nova-pl';


@Component({
  selector: 'page-pl-andamento',
  templateUrl: 'pl-andamento.html'
})
export class PlAndamentoPage {

  private pls: ProjetoDeLei[] = [];

  constructor(public navCtrl: NavController,
    public projetoDeLeiService: ProjetoDeLeiService,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform) {

    }

    ionViewWillEnter() {
      this.carregarPropostas();
    }

    private carregarPropostas() {
      this.projetoDeLeiService.getProjetosDeLei('tr').then(res => {
        if (!res.error) {
          this.pls = res.data;
        }
      })
    }

  private novoPL(){
    this.navCtrl.push(NovaPlPage);
  }

  private aprovar(pl: ProjetoDeLei) {
    pl.estado = 'cp';
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
    pl.estado = 'cn';
    this.projetoDeLeiService.editProjetoDeLei(pl).then(res => {
      if (!res.error && res.value) {
        //works fine
        this.carregarPropostas();
      } else {
        //error
      }
    });
  }

  private like(pl: ProjetoDeLei) {

  }

  private dislike(pl: ProjetoDeLei) {

  }


  private abrirOpcoes(pl: ProjetoDeLei) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Reprovar',
          role: 'destructive',
          handler: () => {
            this.reprovar(pl);
          }
        },
        {
          text: 'Aprovar',
          handler: () => {
            this.aprovar(pl);
          }
        },
        {
          text: 'Cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

}
