import { Component } from '@angular/core';
import { AlertController, Platform, ToastController, NavParams, LoadingController, ViewController, ActionSheetController } from 'ionic-angular';
import { Requerimento } from '../../model/requerimento';
import { Solicitacao } from '../../model/solicitacao';
import { FotoService } from '../../providers/foto-service';
import { RequerimentoService } from '../../providers/requerimento-service';
import { StorageService } from '../../providers/storage';
import { Usuario } from '../../model/user';

@Component({
  selector: 'page-requerimento',
  templateUrl: 'requerimento.html'
})
export class RequerimentoPage {

  public requerimento: Requerimento = new Requerimento();
  private andamento: string = "";
  private operacao: string = "";
  private solicitacao: Solicitacao;
  private visualizar: boolean = false;
  private meuUser: Usuario = new Usuario();

  constructor(
    public navParams: NavParams,
    public platform: Platform,
    public viewController: ViewController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private fotoService: FotoService,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    private requerimentoService: RequerimentoService,
    private storageService: StorageService
  ) {

    this.storageService.get().then(userRes => this.meuUser = userRes);
    this.operacao = this.navParams.get("operacao");
    
    if (this.operacao == "visualizar") {
      this.visualizar = true;
      var loading = this.loadingCtrl.create({
        content: 'Carregando'
      });
      this.solicitacao = this.navParams.get("solicitacao");

      loading.present();
      this.requerimentoService.getRequerimentosByID(this.solicitacao.IDSolicitacao).then(buscaRequerimento => {
        this.requerimento = buscaRequerimento.data;
        this.andamento = this.solicitacao.andamento.toString();
        loading.dismiss();
      }).catch(() => loading.dismiss());
    }
  }

  private finalizar() {
    if (this.andamento == '') {
      this.displayToast('Descreva o andamento');
    } else {
      if (this.operacao == "novo") {
        this.enviarMensagem();
      } else {
        this.viewController.dismiss({ requerimento: this.requerimento, andamento: this.andamento });
      }
    }
  }

  private importarFoto() {
    this.fotoService.importarFoto().then(url => {
      if (url !== "false") {
        this.requerimento.fotoURL.push(url);
      }
    });
  }

  private opcaoAdd() {
    let semFoto = this.actionSheetCtrl.create({
      title: "Adicionar",
      buttons: [
        {
          text: 'Foto da galeria',
          role: 'image',
          icon: 'md-image',
          handler: () => {
            this.importarFoto();
          }
        },
        {
          text: 'Foto da câmera',
          role: 'camera',
          icon: 'md-camera',
          handler: () => {
            this.tirarFoto();
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

  private opcaoApagar(url) {
    if (this.meuUser.permissao == 1 && !this.visualizar) {

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
            this.viewController.dismiss({ requerimento: this.requerimento, andamento: this.andamento, msg: data.mensagem });
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
    this.viewController.dismiss();
  }

  private editar() {
    this.visualizar = false;
  }
}
