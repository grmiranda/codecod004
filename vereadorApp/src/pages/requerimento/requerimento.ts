import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, NavParams, LoadingController, ViewController, ActionSheetController } from 'ionic-angular';
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
  private andamento: string = "";
  private operacao: string = "";
  private solicitacao: Solicitacao;
  private visualizar: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private fotoService: FotoService,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    private requerimentoService: RequerimentoService
  ) {

    this.operacao = this.navParams.get("operacao");
    if (this.operacao == "visualizar") {
      this.visualizar = true;
      var loading = this.loadingCtrl.create({
        content: 'Carregando'
      });

      loading.present();
      this.solicitacao = this.navParams.get("solicitacao");
      this.requerimentoService.getRequerimentosByID(this.solicitacao.IDSolicitacao).then(buscaRequerimento => {
        alert(JSON.stringify(buscaRequerimento));
        this.requerimento = buscaRequerimento;
        this.andamento = this.solicitacao.andamento;
        loading.dismiss();
      }).catch(()=>loading.dismiss());
    }
  }

  private finalizar() {
    if (this.andamento == '') {
      this.displayToast('Descreva o andamento');
    } else {
      if (this.operacao == "novo") {
        this.enviarMensagem();
      } else {
        this.view.dismiss({ requerimento: this.requerimento, andamento: this.andamento });
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
            this.view.dismiss({ requerimento: this.requerimento, andamento: this.andamento, msg: data.mensagem });
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

  private editar(){
    this.visualizar = false;
  }
}
