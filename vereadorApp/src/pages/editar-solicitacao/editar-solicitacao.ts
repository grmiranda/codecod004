import { Component } from '@angular/core';
import { NavParams, NavController, ActionSheetController, AlertController } from 'ionic-angular';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { FotoService } from '../../providers/foto-service';
import { Solicitacao } from '../../model/solicitacao';


@Component({
  selector: 'page-editar-solicitacao',
  templateUrl: 'editar-solicitacao.html'
})
export class EditarSolicitacaoPage {

  private solicitacao: Solicitacao = new Solicitacao();

  constructor(public navParams: NavParams,
    public navController: NavController,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    public fotoService: FotoService,
    public solicitacaoService: SolicitacaoService) {
    this.solicitacao = JSON.parse(JSON.stringify(this.navParams.get("solicitacao")));
  }

  private editar() {
    let callback = this.navParams.get("page");
    callback.myCallbackFunction(callback.feedService, callback, this.solicitacao);
    this.navController.pop();
  }

  private importarFoto() {
    this.fotoService.importarFoto().then(url => {
      if (url !== "false") {
        this.solicitacao.fotoURL.push(url);
      }
    });
  }

  private opcaoApagar(url) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Remover foto " + (this.solicitacao.fotoURL.indexOf(url) + 1),
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
        this.solicitacao.fotoURL.push(url);
      }
    });
  }

  private removerFoto(url: string) {
    let index = this.solicitacao.fotoURL.indexOf(url);
    if (index == 0) {
      this.solicitacao.fotoURL.shift();
    } else if (index > 0) {
      this.solicitacao.fotoURL.splice(index, 1);
    }
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
            this.editar();
          }
        }
      ]
    });
    confirm.present();
  }

}
