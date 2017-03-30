import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Depoimento } from '../../model/depoimento';
import { NovoDepoimentoPage } from '../novo-depoimento/novo-depoimento';
import { DepoimentoService } from '../../providers/depoimento-service';

@Component({
  selector: 'page-depoimento',
  templateUrl: 'depoimento.html'
})
export class DepoimentoPage {
  private depoimentos: Depoimento[] = [];

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public navParams: NavParams,
    private depoimentoService: DepoimentoService) {
    this.carregar();
  }

  private carregar(){

    let loading = this.loadingCtrl.create({
      content: 'Carregando'
    });

    loading.present();

    this.depoimentoService.getDepoimentoAprovados().then(depoimento=>{
      loading.dismiss();
      if(depoimento){
        this.depoimentos = depoimento;
      }else{
        this.tentarNovamente();
      }
    });
  }

  public novoDepoimento(){
    this.navCtrl.push(NovoDepoimentoPage);
  }

  private doRefresh(refresher) {
    this.depoimentoService.getDepoimentoAprovados().then(depoimento=>{
      refresher.complete();
      if(depoimento){
        this.depoimentos = depoimento;
      }else{
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
            this.carregar();
          }
        }
      ]
    });
    confirm.present();
  }
}
