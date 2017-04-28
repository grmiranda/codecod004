import { Component } from '@angular/core';
import { NovaPublicacaoPage } from '../nova-publicacao/nova-publicacao';
import { EditarPublicacaoPage } from '../editar-publicacao/editar-publicacao';
import { PublicacaoPage } from '../publicacao/publicacao';
import { Platform, Events, NavController, ActionSheetController, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { PublicacaoService } from '../../providers/publicacao-service';
import { Publicacao } from '../../model/publicacao';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { StorageService } from '../../providers/storage';
import { DeepLinkService } from '../../providers/deep-link-service';
import { Usuario } from '../../model/user';
import { BuscaUsuariosService } from '../../providers/busca-usuarios-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private publicacoes: Publicacao[] = [];
  private meuUser: Usuario;

  constructor(
    private platform: Platform,
    private alertCtrl: AlertController,
    private domSanitizer: DomSanitizer,
    private navCtrl: NavController,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private publicacaoService: PublicacaoService,
    private actionSheetCtrl: ActionSheetController,
    private menu: MenuController,
    private buscaUser: BuscaUsuariosService,
    public events: Events
  ) {
    this.storageService.get().then(res => {
      this.meuUser = res;
      this.banimento();
    });
    menu.enable(true);
  }

  ionViewWillEnter() {
    this.carregarFeed();
  }

  banimento() {
    this.buscaUser.getBanidoPermissao(this.meuUser.IDUsuario).then(resposta => {
      if ((+resposta[0])) {
        this.events.publish('banido');
      }
      if ((+resposta[1]) != this.meuUser.permissao) {
        this.meuUser.permissao = (+resposta[1]);
        this.storageService.set(this.meuUser);
      }
    });
  }

  private carregarFeed() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando'
    });


    this.publicacaoService.getPublicacoes().then(res => {
      loading.dismiss();
      if (!res.error) {
        let teste = res.data;
        for (let p of teste) {
          if (p.video !== '') {
            p.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(p.video);
          }
        }
        this.publicacoes = teste;
      } else {
        //ocorreu um error
        this.tentarNovamente();
      }
    });
  }

  private novaPublicacao() {
    this.navCtrl.push(NovaPublicacaoPage);
  }

  private abrirPublicacao(publicacao: any) {
    this.navCtrl.push(PublicacaoPage, { publicacao: publicacao });
  }

  private deletarPublicacao(publicacao) {
    this.publicacaoService.deletePublicacao(publicacao).then(res => {
      if (!res.error) {
        if (res.value) {
          //deletou
          this.carregarFeed();
        }
      }
    });
  }

  private abrirOpcoes(publicacao: Publicacao) {
    if (this.meuUser.permissao == 1) {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Opções',
        buttons: [
          {
            text: 'Excluir',
            role: 'destructive',
            icon: !this.platform.is('ios') ? 'trash' : null,
            handler: () => {
              this.deletarPublicacao(publicacao);
            }
          },
          {
            text: 'Editar',
            icon: !this.platform.is('ios') ? 'create' : null,
            handler: () => {
              let publicacaoNova = new Publicacao();
              publicacaoNova.copy(publicacao);
              this.navCtrl.push(EditarPublicacaoPage, { publicacao: publicacaoNova });
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
  }

  private tentarNovamente() {
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
            this.carregarFeed();
          }
        }
      ]
    });
    confirm.present();
  }

  private doRefresh(refresher) {

    this.publicacaoService.getPublicacoes().then(res => {
      refresher.complete();

      if (!res.error) {
        let teste = res.data;
        for (let p of teste) {
          if (p.video !== '') {
            p.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(p.video);
          }
        }
        this.publicacoes = teste;
        this.banimento();
      } else {
        //ocorreu um error
        this.tentarNovamente();
      }
    });
  }

  private toggleMenu() {
    this.menu.toggle();
  }

}
