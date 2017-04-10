import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
import { ProjetoDeLeiService } from '../../providers/pl-service';
import { StorageService } from '../../providers/storage';
import { PushService } from '../../providers/push-service';

@Component({
  selector: 'page-nova-proposta-pl',
  templateUrl: 'nova-proposta-pl.html'
})
export class NovaPropostaPlPage {

  private pl: ProjetoDeLei = new ProjetoDeLei();
  private myID;

  constructor(public navCtrl: NavController,
    public projetoDeLeiService: ProjetoDeLeiService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private storageService: StorageService,
    private pushNotification: PushService
    ) {
    this.storageService.get().then(res => {
      this.myID = res.IDUsuario;
    });

  }

  ionViewWillEnter() {

  }

  private finalizar() {
    if (this.pl.titulo.trim() == '') {
      this.displayToast("Adicione um título à Proposta");
    } else if (this.pl.ementa.trim() == '') {
      this.displayToast("Adicione uma ementa à Proposta");
    } else {
      this.pl.estado = 'sa';
      this.pl.IDUsuario = this.myID;
      this.projetoDeLeiService.addProjetoDeLei(this.pl).then(res => {
        if (!res.error && res.value) {
          this.pushNotification.pushGrupo("Novo Projeto de Lei para ser avaliado", "administracao");
          this.displayToast("Proposta enviada para avaliação");
          this.navCtrl.pop();
        } else {
          //error - falta de conexão / tentar novamente
          this.showConfirm();
        }
      });
    }
  }

  private help() {
    let toast = this.toastCtrl.create({
      message: 'Ementa: consiste em breve apresentação do conteúdo previsto em determinada lei, por isso, deve ser feita de forma clara e concisa.',
      showCloseButton: true,
      closeButtonText: 'Ok',
      cssClass: 'toastHelp',
      position: 'top'
    });

    toast.present();
  }

  private displayToast(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'top'
    });
    toast.present();
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
            this.finalizar();
          }
        }
      ]
    });
    confirm.present();
  }
}
