import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, NavParams } from 'ionic-angular';
import { Requerimento } from '../../model/requerimento';
import { Solicitacao } from '../../model/solicitacao';
import { FotoService } from '../../providers/foto-service';
import { RequerimentoService } from '../../providers/requerimento-service';

@Component({
  selector: 'page-requerimento',
  templateUrl: 'requerimento.html'
})
export class RequerimentoPage {

  public requerimento: Requerimento = new Requerimento();
  public solicitacao: Solicitacao;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private fotoService: FotoService,
    private requerimentoService: RequerimentoService) {

    this.solicitacao = this.navParams.get("solicitacao");

  }

  private finalizar() {

    if(this.solicitacao.andamento.trim() == '' || this.solicitacao.andamento == null){
      this.displayToast('Descreva o andamento da Solicitação');
    }else{
      this.requerimento.IDSolicitacao = this.solicitacao.IDSolicitacao;
      this.requerimento.idUsuarioSolicitacao = this.solicitacao.IDUsuario;
      this.requerimentoService.addRequerimento(this.requerimento).then(res => {
        if (!res.error && res.value) {
          //works fine
          this.displayToast('Concluído');
          this.navCtrl.pop();
        } else {
          this.showConfirm();
        }
      });
    }

  }

  private importarFoto() {
    this.fotoService.importarFoto().then(url => {
      if (url !== "false") {
        this.solicitacao.fotoURL = url;
      }
    });
  }

  private tirarFoto() {
    this.fotoService.tirarFoto().then(url => {
      if (url !== "false") {
        this.solicitacao.fotoURL = url;
      }
    });
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
