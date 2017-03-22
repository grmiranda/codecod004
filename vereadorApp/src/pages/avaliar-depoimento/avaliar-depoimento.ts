import { Component } from '@angular/core';
import { ActionSheetController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Depoimento } from '../../model/depoimento';
import { DepoimentoService } from '../../providers/depoimento-service';


@Component({
  selector: 'page-avaliar-depoimento',
  templateUrl: 'avaliar-depoimento.html'
})
export class AvaliarDepoimentoPage {

  private depoimentos: Depoimento[] = [];

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private depoimentoService: DepoimentoService,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.carregarDepoimentos();
  }

  carregarDepoimentos() {
    this.depoimentoService.getDepoimentoAvaliar().then(depoi => {
      console.log(depoi);
      this.depoimentos = depoi;
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

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
