import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, NavParams, ViewController } from 'ionic-angular';
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
    private requerimentoService: RequerimentoService,
    private feedService: FeedBackService
  ) {

    this.solicitacao = this.navParams.get("solicitacao");

  }

  private finalizar() {

    if (this.solicitacao.andamento == null || this.solicitacao.andamento.trim() == '') {
      this.displayToast('Descreva o andamento da Solicitação');
    } else {
      this.view.dismiss(this.requerimento);
      //this.feedService.showPromptConfirmarVarios(this.solicitacao.ids, this.solicitacao.pushs, this, this.solicitacao);
    }
  }

  private confirmado(solicitacaoAtual) {
    this.requerimento.IDSolicitacao = solicitacaoAtual.IDSolicitacao;
    this.requerimento.idUsuarioSolicitacao = solicitacaoAtual.IDUsuario;
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

  private cancel() {
    this.view.dismiss();
  }
}
