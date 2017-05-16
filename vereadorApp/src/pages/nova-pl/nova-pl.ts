import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, NavParams, ActionSheetController, ViewController, Platform } from 'ionic-angular';
import { FotoService } from '../../providers/foto-service';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
import { ProjetoDeLeiService } from '../../providers/pl-service';
import { StorageService } from '../../providers/storage';

@Component({
  selector: 'page-nova-pl',
  templateUrl: 'nova-pl.html'
})
export class NovaPlPage {

  private pl: ProjetoDeLei;
  private myID;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public projetoDeLeiService: ProjetoDeLeiService,
    public view: ViewController,
    private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private fotoService: FotoService,
    public platform: Platform,
    private storageService: StorageService
    ) {

    this.pl = this.navParams.get("pl");
    if (this.pl == undefined) {
      this.pl = new ProjetoDeLei();
    }

    this.storageService.get().then(res => {
       this.myID = res.IDUsuario;
     });
  }

  private finalizar() {
    if (this.pl.titulo.trim() == '') {
      this.displayToast("Adicione um título à Proposta");
    } else if (this.pl.ementa.trim() == '') {
      this.displayToast("Adicione uma ementa à Proposta");
    } else {
      this.pl.estado = 'tr';
      this.pl.IDUsuario = 6;
      this.projetoDeLeiService.addProjetoDeLei(this.pl).then(res => {
        if (!res.error && res.value) {
          this.displayToast("Projeto criado com sucesso!");
          this.navCtrl.pop();
        } else {
          //error - falta de conexão / tentar novamente
          this.showConfirm();
        }
      });
    }
  }

  private importarFoto() {
    this.fotoService.importarFoto().then(url => {
      if (url !== "false") {
        this.pl.fotoURL.push(url);
      }
    });
  }

  private tirarFoto() {
    this.fotoService.tirarFoto().then(url => {
      if (url !== "false") {
        this.pl.fotoURL.push(url);
      }
    });
  }

  opcaoAdd() {
    let semFoto = this.actionSheetCtrl.create({
      title: "Adicionar",
      buttons: [
        {
          text: 'Foto da galeria',
          icon: !this.platform.is('ios') ? 'md-image' : null,
          handler: () => {
            this.importarFoto();
          }
        },
        {
          text: 'Foto da câmera',
          icon: !this.platform.is('ios') ? 'md-camera' : null,
          handler: () => {
            this.tirarFoto();
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
    semFoto.present();
  }

  private opcaoApagar(url) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Remover foto " + (this.pl.fotoURL.indexOf(url) + 1),
      buttons: [
        {
          text: 'Remover Foto',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.removerFoto(url);
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

  private removerFoto(url: string) {
    let index = this.pl.fotoURL.indexOf(url);
    if (index == 0) {
      this.pl.fotoURL.shift();
    } else if (index > 0) {
      this.pl.fotoURL.splice(index, 1);
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

  private cancel(){
    this.view.dismiss();
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
