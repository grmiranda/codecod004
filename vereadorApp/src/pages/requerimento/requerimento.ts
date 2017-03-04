import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  public solicitacao: Solicitacao;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fotoService: FotoService,
    private requerimentoService: RequerimentoService) {
    this.solicitacao = this.navParams.get("solicitacao");
  }

  private finalizar() {
    this.requerimento.IDSolicitacao = this.solicitacao.IDSolicitacao;
    this.requerimentoService.addRequerimento(this.requerimento).then(res => {
      if (!res.error && res.value) {
        //works fine
        this.navCtrl.pop();
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

}
