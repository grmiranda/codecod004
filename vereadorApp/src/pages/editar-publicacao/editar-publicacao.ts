import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ActionSheetController } from 'ionic-angular';
import { Publicacao } from '../../model/publicacao';
import { PublicacaoService } from '../../providers/publicacao-service';
import { FotoService } from '../../providers/foto-service';

@Component({
  selector: 'page-editar-publicacao',
  templateUrl: 'editar-publicacao.html'
})
export class EditarPublicacaoPage {

  public publicacao: Publicacao = new Publicacao();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    public fotoService: FotoService,
    public publicacaoService: PublicacaoService) {
    this.publicacao = JSON.parse(JSON.stringify(this.navParams.get("publicacao")));;
  }

  private editar() {
    this.publicacaoService.editPublicacao(this.publicacao).then(res => {
      if (!res.error) {
        if (res.value) {
          this.navCtrl.pop();
        }
      } else {
        this.showConfirm();
      }
    });
  }

  private importarFoto() {
    this.fotoService.importarFoto().then(url => {
      if (url !== "false") {
        this.publicacao.fotoURL.push(url);
      }
    });
  }

  private opcaoApagar(url) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Remover foto " + (this.publicacao.fotoURL.indexOf(url) + 1),
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
        this.publicacao.fotoURL.push(url);
      }
    });
  }

  private removerFoto(url: string) {
    let index = this.publicacao.fotoURL.indexOf(url);
    if (index == 0) {
      this.publicacao.fotoURL.shift();
    } else if (index > 0) {
      this.publicacao.fotoURL.splice(index, 1);
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
