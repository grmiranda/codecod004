import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { CorpoMensagem } from '../model/mensagem';
import { MensagemService } from './mensagem-service';
import { StorageService } from './storage';
import { PushService } from './push-service';
import { SolicitacaoService } from './solicitacao-service';

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
    this.storageService.get().then(user => this.meuId = user.IDUsuario);

  }

  public showPromptAprovar(idUser: string, push, funcao, solicitacao, msg) {
    let mensagemEnviar = new CorpoMensagem();
    mensagemEnviar.mensagem = msg;
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

  public showPromptReprovar(idUser: string, push, funcao, solicitacao) {
    this.alertCtrl.create({
      title: 'Recusar',
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
            if (data.mensagem != "") {
              let mensagemEnviar = new CorpoMensagem();
              mensagemEnviar.mensagem = data.mensagem;
              mensagemEnviar.destinatario = idUser;
              mensagemEnviar.remetente = this.meuId;
              this.mensagemService.enviarMensagem(mensagemEnviar).then(res => {
                if (res == true) {
                  funcao.reprovar(solicitacao);
                  let pessoa = { Push: push };
                  this.pushService.pushUmaPessoa("Nova mensagem", pessoa);
                }
              });
            } else {
              funcao.reprovar(solicitacao);
            }

          }
        }]
    }).present();
  }

  public reprovarVarios(idUser: string[], push, funcao, solicitacaoEPl, msg: string) {
    if (msg != "") {
      let mensagemEnviar = new CorpoMensagem();
      mensagemEnviar.mensagem = msg;
      mensagemEnviar.remetente = this.meuId;
      for (let i = 0; i < idUser.length; i++) {
        mensagemEnviar.destinatario = idUser[i];
        this.mensagemService.enviarMensagem(mensagemEnviar).then(res => {
          if (res == true) {
            let pessoa = { Push: push[i] };
            this.pushService.pushUmaPessoa("Nova mensagem", pessoa);
          }
          funcao.reprovar(solicitacaoEPl);
        });
      }
    }
    else {
      if (funcao != null) {
        funcao.reprovar(solicitacaoEPl);
      }
    }
  }

  public confirmarVariosRequerimento(idUser: string[], push, funcao, solicitacao, requerimento, msg: string) {
    if (msg != "") {
      let mensagemEnviar = new CorpoMensagem();
      mensagemEnviar.mensagem = msg;
      mensagemEnviar.remetente = this.meuId;
      for (let i = 0; i < idUser.length; i++) {
        mensagemEnviar.destinatario = idUser[i];
        this.mensagemService.enviarMensagem(mensagemEnviar).then(res => {
          if (res == true) {
            let pessoa = { Push: push[i] };
            this.pushService.pushUmaPessoa("Nova mensagem", pessoa);
          }

        });
      }
      if (requerimento == null) {
        funcao.confirmado(solicitacao);
      } else {
        funcao.confirmado(solicitacao, requerimento);
      }
    }
    else {
      if (requerimento == null) {
        funcao.confirmado(solicitacao);
      } else {
        funcao.confirmado(solicitacao, requerimento);
      }
    }
  }


  public confirmarVariasPl(idUser: string[], push, funcao, pl, aux, msg: string) {
    if (msg != "") {
      let mensagemEnviar = new CorpoMensagem();
      mensagemEnviar.mensagem = msg;
      mensagemEnviar.remetente = this.meuId;
      for (let i = 0; i < idUser.length; i++) {
        mensagemEnviar.destinatario = idUser[i];
        this.mensagemService.enviarMensagem(mensagemEnviar).then(res => {
          if (res == true) {
            let pessoa = { Push: push[i] };
            this.pushService.pushUmaPessoa("Nova mensagem", pessoa);
          }
        });
      }
      if (aux == null) {
        funcao.confirmado(pl);
      } else {
        funcao.confirmado(pl, aux);
      }
    }
    else {
      if (aux == null) {
        funcao.confirmado(pl);
      } else {
        funcao.confirmado(pl, aux);
      }
    }
  }


}
