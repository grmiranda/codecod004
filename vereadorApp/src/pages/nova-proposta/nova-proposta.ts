import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { FotoService } from '../../providers/foto-service';
import { Solicitacao } from '../../model/solicitacao';
import { StorageService } from '../../providers/storage';

@Component({
  selector: 'page-nova-proposta',
  templateUrl: 'nova-proposta.html'
})
export class NovaPropostaPage {

  private solicitacao: Solicitacao = new Solicitacao();

  constructor(private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private solicitacaoService: SolicitacaoService,
    private fotoService: FotoService,
    private storageService: StorageService
  ) {

  }

  private requisitar() {
    if (this.solicitacao.titulo.trim() == '') {
      this.displayToast('Adicione um título');
    } else if (this.solicitacao.descricao.trim() == '') {
      this.displayToast('Adicione uma descrição');
    } else {
      this.storageService.get().then(user => {
        this.solicitacao.IDUsuario = (+user.IDUsuario);
        this.solicitacaoService.addSolicitacao(this.solicitacao).then(res => {
          if (!res.error) {
            if (res.value) {
              //works fine
              this.displayToast('Requisição enviada!');
              this.navCtrl.pop();
            }
          } else {
            //error - maioria das vezes de conexão
            //pede confirmacao, se sim : tenta salvar denovo
            this.showConfirm();
          }
        });
      });
    }
  }

  private importarFoto() {
    this.fotoService.importarFoto().then(url => {
      if (url !== "false") {
        this.solicitacao.fotoURL.push(url);
      }
    });
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
    if(index == 0){
      this.solicitacao.fotoURL.shift();
    }else if(index > 0){
      this.solicitacao.fotoURL.splice(index, 1);
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
            this.requisitar();
          }
        }
      ]
    });
    confirm.present();
  }
}
