import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, NavParams, ActionSheetController, ViewController } from 'ionic-angular';
import { FotoService } from '../../providers/foto-service';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
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
    public view: ViewController,
    private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private fotoService: FotoService,
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
      this.enviarMensagem();
    }
  }

  public enviarMensagem() {
    this.alertCtrl.create({
      title: 'Aprovar',
      message: "Digite mensagem para usuario",
      inputs: [
        {
          name: 'mensagem',
          placeholder: 'Digite aqui'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Enviar',
          handler: data => {
          this.view.dismiss({pl: this.pl, msg : data.mensagem});
          }
        }]
    }).present();
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

  private opcaoApagar(url) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Remover foto " + (this.pl.fotoURL.indexOf(url) + 1),
      buttons: [
        {
          text: 'Remover Foto',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.removerFoto(url);
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

}
