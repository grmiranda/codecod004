import { Component } from '@angular/core';
import { NavParams, PopoverController, LoadingController } from 'ionic-angular';
import { Solicitacao } from '../../model/solicitacao';
import { CompartilharPage } from '../compartilhar/compartilhar';
import { SolicitacaoService } from '../../providers/solicitacao-service';

@Component({
  selector: 'page-visualizar-solicitacao',
  templateUrl: 'visualizar-solicitacao.html'
})
export class VisualizarSolicitacaoPage {

  private solicitacao: Solicitacao;

  constructor(
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    private solicitacaoService: SolicitacaoService
  ) {
    this.solicitacao = navParams.get('solicitacao');
    if (this.solicitacao.titulo == "") {
      let loading = this.loadingCtrl.create({
        content: 'Carregando'
      });
      loading.present();
      this.solicitacaoService.getSolicitacaoId(this.solicitacao.IDSolicitacao).then(res => {
        loading.dismiss();
        this.solicitacao = res.data;
      }).catch(() => loading.dismiss());
    }
  }

  compartilhar() {
    let popover = this.popoverCtrl.create(CompartilharPage, { titulo: this.solicitacao.titulo, subtitulo: this.solicitacao.descricao, foto: this.solicitacao.fotoURL[0], tipo: "solicitacao", id: this.solicitacao.IDSolicitacao });
    let ev = {
      target: {
        getBoundingClientRect: () => {
          return {
            top: '100'
          };
        }
      }
    };
    popover.present({ ev: event });
  }

}
