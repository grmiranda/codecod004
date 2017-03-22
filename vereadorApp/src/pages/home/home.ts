import { Component } from '@angular/core';
import { NovaPublicacaoPage } from '../nova-publicacao/nova-publicacao';
import { EditarPublicacaoPage } from '../editar-publicacao/editar-publicacao';
import { PublicacaoPage } from '../publicacao/publicacao';
import { Platform, NavController, ActionSheetController, MenuController, LoadingController } from 'ionic-angular';
import { PublicacaoService } from '../../providers/publicacao-service';
import { Publicacao } from '../../model/publicacao';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private publicacoes: Publicacao[] = [];

  constructor(private platform: Platform,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private publicacaoService: PublicacaoService,
    private actionSheetCtrl: ActionSheetController,
    private menu: MenuController) {
    menu.enable(true);
  }

  ionViewWillEnter() {
    this.carregarFeed();
  }

  private carregarFeed() {

    let loading = this.loadingCtrl.create({
      content: 'Carregando'
    });

    loading.present();

    this.publicacaoService.getPublicacoes().then(res => {
      loading.dismiss();
      if (!res.error) {
        this.publicacoes = res.data;
      } else {
        //ocorreu um error
      }
    });
  }

  private novaPublicacao() {
    this.navCtrl.push(NovaPublicacaoPage);
  }

  private abrirPublicacao(publicacao: any) {
    this.navCtrl.push(PublicacaoPage, { publicacao: publicacao });
  }

  private deletarPublicacao(id: number) {
    this.publicacaoService.deletePublicacao(id).then(res => {
      if (!res.error) {
        if (res.value) {
          //deletou
          this.carregarFeed();
        }
      }
    });
  }

  private abrirOpcoes(publicacao: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Excluir',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.deletarPublicacao(publicacao.IDPublicacao);
          }
        },
        {
          text: 'Editar',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.navCtrl.push(EditarPublicacaoPage, { publicacao: publicacao });
          }
        },
        {
          text: 'Cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  private doRefresh(refresher) {
    this.publicacaoService.getPublicacoes().then(res => {
      refresher.complete();
      if (!res.error) {
        this.publicacoes = res.data;
      }
    });
  }

}
