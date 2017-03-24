import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';
import { PublicacaoService } from '../../providers/publicacao-service';
import { FotoService } from '../../providers/foto-service';
import { Publicacao } from '../../model/publicacao';

@Component({
  selector: 'page-nova-publicacao',
  templateUrl: 'nova-publicacao.html'
})
export class NovaPublicacaoPage {

  private publicacao: Publicacao = new Publicacao();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public publicacaoService: PublicacaoService,
    public fotoService: FotoService) {

  }

  private publicar() {
    if (this.publicacao.titulo === "") {
      this.displayToast('Insira um título à publicacao!');
    } else if (this.publicacao.texto === "") {
      this.displayToast('Insira uma descrição à publicacao!');
    } else {
      this.publicacaoService.addPublicacao(this.publicacao).then(res => {
        if (!res.error) {
          if (res.value) {
            this.displayToast('Publicou com sucesso!');
            this.navCtrl.pop();
          } else {
            //retornou false
          }
        } else {
          //error de conexao
        }
      });
    }
  }

  private addLink() {
    let prompt = this.alertCtrl.create({
      title: 'YouTube',
      message: "Insira a url do vídeo do YouTube",
      inputs: [
        {
          name: 'link',
          placeholder: 'Link'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.publicacao.video = data.link;
          }
        }
      ]
    });
    prompt.present();
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

  private displayToast(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

}
