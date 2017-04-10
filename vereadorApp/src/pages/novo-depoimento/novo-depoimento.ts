import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DepoimentoService } from '../../providers/depoimento-service';
import { StorageService } from '../../providers/storage';

@Component({
  selector: 'page-novo-depoimento',
  templateUrl: 'novo-depoimento.html'
})
export class NovoDepoimentoPage {

  private textoDepoimento: string = "";

  constructor(
    public navCtrl: NavController,
    private depoimentoService: DepoimentoService,
    private toastCtrl: ToastController,
    private storageService: StorageService
    ) {
    }


  public enviar() {
    this.storageService.get().then(resStorage=>
    this.depoimentoService.enviarDepoimento(this.textoDepoimento, resStorage.IDUsuario).then(res => {
      if (res == true) {
        this.navCtrl.pop();
        let toast = this.toastCtrl.create({
          message: "Depoimento enviado para avaliação",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    }));
  }
}
