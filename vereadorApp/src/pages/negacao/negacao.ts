import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { Negacao } from '../../model/negacao';


@Component({
  selector: 'page-negacaox',
  templateUrl: 'negacao.html'
})
export class NegacaoPage {

  private andamento: string = "";
  private operacao: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController
  ) {

    this.operacao = this.navParams.get("operacao");
    if (this.operacao == "visualizar") {
      this.andamento = this.navParams.get("andamento");
    }

  }

  private finalizar() {

    if (this.andamento == '') {
      this.displayToast('Descreva o andamento');
    } else {
      if (this.operacao == "novo") {
        this.enviarMensagem();

      } else {
        this.view.dismiss({ andamento: this.andamento });
      }
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
            this.view.dismiss({ andamento: this.andamento, msg: data.mensagem });
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
