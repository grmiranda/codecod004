import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { Requerimento } from '../../model/requerimento';
import { FotoService } from '../../providers/foto-service';
import { FeedBackService } from '../../providers/feed-back-service';


@Component({
  selector: 'page-requerimento',
  templateUrl: 'requerimento.html'
})
export class RequerimentoPage {

  public requerimento: Requerimento = new Requerimento();
  private andamento: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private fotoService: FotoService,
    public actionSheetCtrl: ActionSheetController,
    private feedService: FeedBackService
  ) {

  }

  private finalizar() {

    if (this.andamento == '') {
      this.displayToast('Descreva o andamento da Solicitação');
    } else {
      this.view.dismiss({requerimento: this.requerimento, andamento: this.andamento});
      //this.feedService.showPromptConfirmarVarios(this.solicitacao.ids, this.solicitacao.pushs, this, this.solicitacao);
    }
  }



  private importarFoto() {
    this.fotoService.importarFoto().then(url => {
      if (url !== "false") {
        this.requerimento.fotoURL.push(url);
      }
    });
  }

  private opcaoApagar(url) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Remover foto " + (this.requerimento.fotoURL.indexOf(url) + 1),
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

  private tirarFoto() {
    this.fotoService.tirarFoto().then(url => {
      if (url !== "false") {
        this.requerimento.fotoURL.push(url);
      }
    });
  }

  private removerFoto(url: string) {
    let index = this.requerimento.fotoURL.indexOf(url);
    if (index == 0) {
      this.requerimento.fotoURL.shift();
    } else if (index > 0) {
      this.requerimento.fotoURL.splice(index, 1);
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

  private cancel() {
    this.view.dismiss();
  }
}
