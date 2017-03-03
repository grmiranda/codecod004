import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Publicacao } from '../../model/publicacao';
import { PublicacaoService } from '../../providers/publicacao-service';
import { FotoService } from '../../providers/foto-service';

@Component({
  selector: 'page-editar-publicacao',
  templateUrl: 'editar-publicacao.html'
})
export class EditarPublicacaoPage {

  public publicacao: Publicacao = new Publicacao();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fotoService: FotoService,
    public publicacaoService: PublicacaoService) {
    this.publicacao = JSON.parse(JSON.stringify(this.navParams.get("publicacao")));;
  }

  private editar() {
    this.publicacaoService.editPublicacao(this.publicacao).then(res => {
      if (!res.error) {
        if (res.value) {
          this.navCtrl.pop();
        } else {
          //retornou false
        }
      } else {
        //error de conexao
      }
    });
  }

  private importarFoto() {
    this.fotoService.importarFoto().then(url => {
      if (url !== "false") {
        this.publicacao.fotoURL = url;
      }
    });
  }

  private tirarFoto() {
    this.fotoService.tirarFoto().then(url => {
      if (url !== "false") {
        this.publicacao.fotoURL = url;
      }
    });
  }

}
