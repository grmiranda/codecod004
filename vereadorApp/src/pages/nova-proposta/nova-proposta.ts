import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { FotoService } from '../../providers/foto-service';
import { Solicitacao } from '../../model/solicitacao';

@Component({
  selector: 'page-nova-proposta',
  templateUrl: 'nova-proposta.html'
})
export class NovaPropostaPage {

  private solicitacao: Solicitacao = new Solicitacao();

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private solicitacaoService: SolicitacaoService,
    private fotoService: FotoService) {

  }

  private requisitar() {
    console.log(this.solicitacao);
    this.solicitacaoService.addSolicitacao(this.solicitacao).then(res => {
      if (!res.error) {
        if (res.value) {
          //works fine
          this.displayToast('Requisição enviada!');
          this.navCtrl.pop();
        }
      } else {
        //error
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


}
