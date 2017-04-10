import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
import { ProjetoDeLeiService } from '../../providers/pl-service';
import { VisualizarPlPage } from '../visualizar-pl/visualizar-pl';

@Component({
  selector: 'page-pl-aprovados',
  templateUrl: 'pl-aprovados.html'
})
export class PlAprovadosPage {

  private pls: ProjetoDeLei[] = [];

  constructor(private projetoDeLeiService: ProjetoDeLeiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public navCtrl: NavController
  ) {

    }

  ionViewWillEnter() {
    this.carregarPropostas();
  }

  private carregarPropostas() {

    let loading = this.loadingCtrl.create({
      content: 'Carregando'
    });

    loading.present();

    this.projetoDeLeiService.getProjetosDeLei('cp').then(res => {
      loading.dismiss();
      if (!res.error) {
        this.pls = res.data;
      }else{
        this.showConfirm();
      }
    });
  }

  private showConfirm() {
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


  private doRefresh(refresher) {
    this.projetoDeLeiService.getProjetosDeLei('cp').then(res => {
      refresher.complete();
      if (!res.error) {
        this.pls = res.data;
      }else{
        this.showConfirm();
      }
    });
  }

  public abrirPL(pl: ProjetoDeLei){
    this.navCtrl.push(VisualizarPlPage, {pl: pl});
  }
}
