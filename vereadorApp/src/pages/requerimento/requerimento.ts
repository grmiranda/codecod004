import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { Requerimento } from '../../model/requerimento';
import { Solicitacao } from '../../model/solicitacao';
import { FotoService } from '../../providers/foto-service';
import { RequerimentoService } from '../../providers/requerimento-service';
import { FeedBackService } from '../../providers/feed-back-service';


@Component({
  selector: 'page-requerimento',
  templateUrl: 'requerimento.html'
})
export class RequerimentoPage {

  public requerimento: Requerimento = new Requerimento();
  public solicitacao: Solicitacao;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private fotoService: FotoService,
    public actionSheetCtrl: ActionSheetController,
    private requerimentoService: RequerimentoService,
    private feedService: FeedBackService
  ) {
    this.solicitacao = this.navParams.get("solicitacao");
    this.solicitacao = new Solicitacao();

  }

  private finalizar() {
    alert(JSON.stringify(this.requerimento.fotoURL.length));

    if (this.solicitacao.andamento == null || this.solicitacao.andamento.trim() == '') {
      this.displayToast('Descreva o andamento da Solicitação');
    } else {
      this.confirmado();
      //this.feedService.showPromptConfirmarVarios(this.solicitacao.ids, this.solicitacao.pushs, this, this.solicitacao);
    }
  }

  private confirmado() {
    /*
    this.requerimento.IDSolicitacao = this.solicitacao.IDSolicitacao;
    this.requerimento.idUsuarioSolicitacao = this.solicitacao.IDUsuario;
    this.requerimentoService.addRequerimento(this.requerimento).then(res => {
      if (!res.error && res.value) {
        //works fine
        this.displayToast('Concluído');
        this.view.dismiss(this.requerimento);
      } else {
        this.showConfirm();
      }
    });
    */
  }

  private importarFoto() {
    this.fotoService.importarFoto().then(url => {
      alert(JSON.stringify(url));
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

  private cancel() {
    this.view.dismiss();
  }
}
