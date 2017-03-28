import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, NavParams } from 'ionic-angular';
import { ProjetoDeLeiService } from '../../providers/pl-service';
import { FotoService } from '../../providers/foto-service';
import { ProjetoDeLei } from '../../model/projeto-de-lei';


@Component({
  selector: 'page-nova-pl',
  templateUrl: 'nova-pl.html'
})
export class NovaPlPage {

  private pl: ProjetoDeLei;
  private myID = 8;

  constructor(public navCtrl: NavController,
    public projetoDeLeiService: ProjetoDeLeiService,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private fotoService: FotoService) {

    this.pl = this.navParams.get("pl");
    if (this.pl == undefined) {
      this.pl = new ProjetoDeLei();
    }
  }

  ionViewWillEnter() {
    // this.storage.get().then(res => {
    //   this.myID = res.IDUsuario;
    // });
  }

  private finalizar() {
    if (this.pl.titulo.trim() == '') {
      this.displayToast("Adicione um título à Proposta");
    } else if (this.pl.ementa.trim() == '') {
      this.displayToast("Adicione uma ementa à Proposta");
    } else {
      if (this.pl.IDUsuario) {
        this.pl.estado = 'tr';
        this.projetoDeLeiService.editProjetoDeLei(this.pl).then(res => {
          if (!res.error && res.value) {
            //works fine
            this.displayToast('Projeto de Lei aceito!');
            this.navCtrl.pop();
          } else {
            //error - falha conexao / tentar denovo
            this.showConfirm();
          }
        });
      } else {
        this.pl.estado = 'tr';
        this.pl.IDUsuario = this.myID;
        this.projetoDeLeiService.addProjetoDeLei(this.pl).then(res => {
          if (!res.error && res.value) {
            //works fine
            this.displayToast('Projeto de Lei criado!');
            this.navCtrl.pop();
          } else {
            //error - falha conexao / tentar denovo
            this.showConfirm();
          }
        });
      }
    }
  }

  private importarFoto() {
    this.fotoService.importarFoto().then(url => {
      if (url !== "false") {
        this.pl.fotos.push(url);
      }
    });
  }

  private tirarFoto() {
    this.fotoService.tirarFoto().then(url => {
      if (url !== "false") {
        this.pl.fotos.push(url);
      }
    });
  }

  private removerFoto(url: string) {
    let index = this.pl.fotos.indexOf(url);
    if (index == 0) {
      this.pl.fotos.shift();
    } else if (index > 0) {
      this.pl.fotos.splice(index, 1);
    }
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
