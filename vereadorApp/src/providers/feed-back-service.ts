import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { CorpoMensagem } from '../model/mensagem';
import { MensagemService } from './mensagem-service';
import { StorageService } from './storage';
import { PushService } from './push-service';
import { SolicitacaoService } from './solicitacao-service';


/*
  Generated class for the FeedBackService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FeedBackService {

  private meuId;

  constructor(
    public http: Http,
    private alertCtrl: AlertController,
    private mensagemService: MensagemService,
    private storageService: StorageService,
    public solicitacaoService: SolicitacaoService,
    private pushService: PushService
  ) {
    console.log('Hello FeedBackService Provider');
    this.storageService.get().then(user => this.meuId = user.IDUsuario);

  }

  public showPrompt(idUser: string, push, funcao, solicitacao) {
    this.alertCtrl.create({
      title: 'Mensagem para usuario',
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
            return false;
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            let mensagemEnviar = new CorpoMensagem();
            mensagemEnviar.mensagem = data.mensagem;
            mensagemEnviar.destinatario = idUser;
            mensagemEnviar.remetente = this.meuId;
            this.mensagemService.enviarMensagem(mensagemEnviar).then(res => {
              if (res == true) {
                funcao.aprovar(solicitacao);
                let pessoa = { Push: push };
                this.pushService.pushUmaPessoa("Nova mensagem", pessoa);
              }
            });
          }
        }]
    }).present();
  }

}
