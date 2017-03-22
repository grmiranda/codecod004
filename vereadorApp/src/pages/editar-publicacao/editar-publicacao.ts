import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
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
        this.publicacao.fotoURL = url;
      }
    });
  }

  private tirarFoto() {
    this.fotoService.tirarFoto().then(url => {
      if (url !== "false") {
        this.publicacao.fotoURL = url;
      }
    });
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
