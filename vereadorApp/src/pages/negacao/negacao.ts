import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { Negacao } from '../../model/negacao';
import { FotoService } from '../../providers/foto-service';


@Component({
  selector: 'page-requerimento',
  templateUrl: 'requerimento.html'
})
export class NegacaoPage {

  public motivo: Negacao = new Negacao();
  private andamento: string = "";
  private operacao: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private fotoService: FotoService,
    public actionSheetCtrl: ActionSheetController
  ) {

    this.operacao = this.navParams.get("operacao");
    if (this.operacao == "visualizar") {
      this.andamento = this.navParams.get("andamento");
      this.motivo = this.navParams.get("negacao");
    }

  }

  private finalizar() {

    if (this.andamento == '') {
      this.displayToast('Descreva o andamento');
    } else {
      if (this.operacao == "novo") {
        this.enviarMensagem();

      } else {
        this.view.dismiss({ negacao: this.motivo, andamento: this.andamento });
      }
      //this.feedService.showPromptConfirmarVarios(this.solicitacao.ids, this.solicitacao.pushs, this, this.solicitacao);
    }
  }



  private importarFoto() {
    this.fotoService.importarFoto().then(url => {
      if (url !== "false") {
        this.motivo.fotoURL.push(url);
      }
    });
  }

  private opcaoApagar(url) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Remover foto " + (this.motivo.fotoURL.indexOf(url) + 1),
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
        this.motivo.fotoURL.push(url);
      }
    });
  }

  private removerFoto(url: string) {
    let index = this.motivo.fotoURL.indexOf(url);
    if (index == 0) {
      this.motivo.fotoURL.shift();
    } else if (index > 0) {
      this.motivo.fotoURL.splice(index, 1);
    }
  }

  public enviarMensagem() {
    this.alertCtrl.create({
      title: 'Motivo de negação',
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
            this.view.dismiss({ negacao: this.motivo, andamento: this.andamento, msg: data.mensagem });
          }
        }]
    }).present();
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
