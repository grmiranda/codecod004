import { Component } from '@angular/core';
import { ActionSheetController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Depoimento } from '../../model/depoimento';
import { DepoimentoService } from '../../providers/depoimento-service';


@Component({
  selector: 'page-avaliar-depoimento',
  templateUrl: 'avaliar-depoimento.html'
})
export class AvaliarDepoimentoPage {

  private depoimentos: Depoimento[] = [];

  constructor(private toastCtrl: ToastController,
    public loadingController: LoadingController,
    private depoimentoService: DepoimentoService,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.carregarDepoimentos();
  }

  private carregarDepoimentos() {

    let loader = this.loadingController.create({
      content: "Carregando eventos"
    });

    loader.present();

    this.depoimentoService.getDepoimentoAvaliar().then(depoimentos => {
      loader.dismiss();
      if (depoimentos) {
        this.depoimentos = depoimentos;
      } else {
        this.tentarNovamente();
      }
    });
  }

  private abrirOpcoes(depoimento: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Negar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.depoimentoService.negar(depoimento.IDDepoimento).then(res => {
              if (res == true) {
                this.carregarDepoimentos();
                this.presentToast("Depoimento aprovado com sucesso");
              } else {
                this.presentToast("Depoimento não aprovado sucesso");
              }
            });
          }
        },
        {
          text: 'Aprovar',
          icon: 'checkmark-circle',
          handler: () => {
            this.depoimentoService.aprovar(depoimento.IDDepoimento).then(res => {
              if (res == true) {
                this.carregarDepoimentos();
                this.presentToast("Depoimento aprovado com sucesso");
              } else {
                this.presentToast("Depoimento não aprovado sucesso");
              }
            });
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
    this.depoimentoService.getDepoimentoAvaliar().then(depoimentos => {
      refresher.complete();
      if (depoimentos) {
        this.depoimentos = depoimentos;
      } else {
        this.tentarNovamente();
      }
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
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
            this.carregarDepoimentos();
          }
        }
      ]
    });
    confirm.present();
  }
}
