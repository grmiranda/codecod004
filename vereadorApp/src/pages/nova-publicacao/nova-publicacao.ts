import { Component } from '@angular/core';
import { NavController, ToastController, AlertController, ActionSheetController } from 'ionic-angular';
import { PublicacaoService } from '../../providers/publicacao-service';
import { FotoService } from '../../providers/foto-service';
import { Publicacao } from '../../model/publicacao';
import { PushService } from '../../providers/push-service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-nova-publicacao',
  templateUrl: 'nova-publicacao.html'
})
export class NovaPublicacaoPage {

  private publicacao: Publicacao = new Publicacao();

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public publicacaoService: PublicacaoService,
    private domSanitizer: DomSanitizer,
    public fotoService: FotoService,
    private pushService: PushService
    ) {

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
            this.pushService.pushGrupo("Nova Noticia", "All");
            this.navCtrl.pop();
          }
        } else {
          //error de conexao
          this.showConfirm();
        }
      });
    }
  }

  opcaoAdd(){
    let semFoto = this.actionSheetCtrl.create({
      title: "Adicionar",
      buttons: [
        {
          text: 'Foto da galeria',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.importarFoto();
          }
        },
        {
          text: 'Foto da câmera',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.tirarFoto();
          }
        },
        {
          text: 'Vídeo',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.addLink();
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
    semFoto.present();

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
            if (data.link.includes('https://youtu.be/')) {
              this.publicacao.video = data.link.replace("https://youtu.be/", "https://www.youtube.com/embed/");
              this.publicacao.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.publicacao.video);

            }
            else if (data.link.includes('watch?v=')) {
              this.publicacao.video = data.link.replace("watch?v=", "embed/");
              this.publicacao.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.publicacao.video);
            }
          }
        }
      ]
    });
    prompt.present();
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
            this.publicar();
          }
        }
      ]
    });
    confirm.present();
  }

  private tirarFoto() {
    this.fotoService.tirarFoto().then(url => {
      if (url !== "false") {
        this.publicacao.fotoURL.push(url);
      }
    });
  }

  private removerVideo(){
    this.publicacao.video = "";
  }

  private removerFoto(url: string) {
    let index = this.publicacao.fotoURL.indexOf(url);
    if (index == 0) {
      this.publicacao.fotoURL.shift();
    } else if (index > 0) {
      this.publicacao.fotoURL.splice(index, 1);
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
