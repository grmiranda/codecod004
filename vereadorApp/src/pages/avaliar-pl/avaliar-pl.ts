import { Component } from '@angular/core';
import { NavController, ActionSheetController, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { ProjetoDeLeiService } from '../../providers/pl-service';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
import { VisualizarPlPage } from '../visualizar-pl/visualizar-pl';
import { FeedBackService } from '../../providers/feed-back-service';

@Component({
  selector: 'page-avaliar-pl',
  templateUrl: 'avaliar-pl.html'
})
export class AvaliarPlPage {

  public pls: ProjetoDeLei[] = [];

  constructor(public projetoDeLeiService: ProjetoDeLeiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    private feedService: FeedBackService,
    private menuCtrl: MenuController,
    public navCtrl: NavController) {

  }

  ionViewWillEnter() {
    this.carregarPropostas();
  }

  private carregarPropostas() {

    let loading = this.loadingCtrl.create({
      content: 'Carregando'
    });

    loading.present();

    this.projetoDeLeiService.getProjetosDeLei('sa').then(res => {
      loading.dismiss();
      if (!res.error) {
        this.pls = res.data;
      } else {
        this.tentarNovamente();
      }
    });
  }

  private aprovar(pl: ProjetoDeLei) {
    pl.estado = 'ap';
    this.projetoDeLeiService.editProjetoDeLei(pl).then(res => {
      if (!res.error && res.value) {
        //works fine
        this.carregarPropostas();
      } else {
        //error
        this.showConfirm(1, pl);
      }
    });
  }

  private reprovar(pl: ProjetoDeLei) {
    this.projetoDeLeiService.delete(pl).then(res => {
      if (!res.error && res.value) {
        //works fine
        this.carregarPropostas();
      } else {
        //error
        this.showConfirm(2, pl);
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
            this.feedService.showPromptReprovar(pl.IDUsuario.toString(), pl.Push, this, pl);
          }
        },
        {
          text: 'Aprovar',
          icon: 'document',
          handler: () => {
            this.feedService.showPromptAprovar(pl.IDUsuario.toString(), pl.Push, this, pl, "Sua proposta de projeto de lei foi aceita com sucesso");
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


  private doRefresh(refresher) {
    this.projetoDeLeiService.getProjetosDeLei('sa').then(res => {
      refresher.complete();
      if (!res.error) {
        this.pls = res.data;
      } else {
        this.tentarNovamente();
      }
    });
  }

  private tentarNovamente() {
    let confirm = this.alertCtrl.create({
      title: 'Falha na conexão',
      message: 'Tentar Novamente ?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Ok',
          handler: () => {
            this.carregarPropostas();
          }
        }
      ]
    });
    confirm.present();
  }

  private showConfirm(tipo: number, pl: ProjetoDeLei) {
    let confirm = this.alertCtrl.create({
      title: 'Falha na conexão',
      message: 'Tentar Novamente ?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Ok',
          handler: () => {
            if (tipo == 1) {
              this.aprovar(pl);
            } else if (tipo == 2) {
              this.reprovar(pl);
            }
          }
        }
      ]
    });
    confirm.present();
  }

  public abrirPL(pl: ProjetoDeLei) {
    this.navCtrl.push(VisualizarPlPage, { pl: pl });
  }

  private toggleMenu(){
    this.menuCtrl.toggle();
  }

}
