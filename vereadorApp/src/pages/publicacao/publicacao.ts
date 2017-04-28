import { Component } from '@angular/core';
import { NavParams, PopoverController, LoadingController, NavController, ToastController } from 'ionic-angular';
import { Publicacao } from '../../model/publicacao';
import { CompartilharPage } from '../compartilhar/compartilhar';
import { PublicacaoService } from '../../providers/publicacao-service';
import { StorageService } from '../../providers/storage';
import { EditarPublicacaoPage } from '../editar-publicacao/editar-publicacao';

@Component({
  selector: 'page-publicacao',
  templateUrl: 'publicacao.html'
})
export class PublicacaoPage {

  public publicacao: Publicacao;
  public permissao = 0;

  constructor(
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public publicacaoService: PublicacaoService,
    storageService: StorageService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {
    this.publicacao = this.navParams.get("publicacao");
    if (this.publicacao.titulo == "") {
      let loading = this.loadingCtrl.create({
        content: 'Carregando'
      });
      loading.present();
      this.publicacaoService.getPublicaoId(this.publicacao.IDPublicacao).then(buscaP => {
        this.publicacao = buscaP.data;
        loading.dismiss();
      }).catch(() => loading.dismiss());
    }
    storageService.get().then(res => this.permissao = res.permissao);

  }

  compartilhar() {
    let popover = this.popoverCtrl.create(CompartilharPage, { titulo: this.publicacao.titulo, subtitulo: this.publicacao.texto, foto: this.publicacao.fotoURL[0], tipo: "publicacao", id: this.publicacao.IDPublicacao });
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

  editar() {
    let publicacaoNova = new Publicacao();
    publicacaoNova.copy(this.publicacao);
    this.navCtrl.push(EditarPublicacaoPage, { publicacao: publicacaoNova });
  }

  excluir() {
    this.deletarPublicacao(this.publicacao);
  }

  private deletarPublicacao(publicacao) {
    this.publicacaoService.deletePublicacao(publicacao).then(res => {
      if (!res.error) {
        if (res.value) {
          //deletou
          this.presentToast("Excluido com sucesso");          
          this.navCtrl.pop();
        }
      }
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
