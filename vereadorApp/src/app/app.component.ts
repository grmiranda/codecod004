import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { StorageService } from '../providers/storage';


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { SolicitacoesPage } from '../pages/solicitacoes/solicitacoes';
import { TabProjetosDeLeiPage } from '../pages/tab-projetos-de-lei/tab-projetos-de-lei';
import { AvaliarSolicitacaoPage } from '../pages/avaliar-solicitacao/avaliar-solicitacao';
import { AvaliarPlPage } from '../pages/avaliar-pl/avaliar-pl';
import { TabMensagemPage } from '../pages/tab-mensagem/tab-mensagem';
import { EnviarMensagemPage } from '../pages/enviar-mensagem/enviar-mensagem';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;

  rootPage = TabMensagemPage;

  pages: Array<{ title: string, component: any }>;
  pageAtual: string;

  constructor(platform: Platform,
    public menuCtrl: MenuController,
    private storage: StorageService
  ) {
    this.pages = [{ title: 'Notícias', component: HomePage },
    { title: 'Solicitações', component: SolicitacoesPage },
    { title: 'Avaliar Solicitação', component: AvaliarSolicitacaoPage },
    { title: 'Projetos de Lei', component: TabProjetosDeLeiPage },
    { title: 'Avaliar Proposta', component: AvaliarPlPage },
    { title: 'Mensagem', component: TabMensagemPage }]
    this.pageAtual = 'Notícias';

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      var notificationOpenedCallback = function (jsonData) {
      };

      // window["plugins"].OneSignal
      //   .startInit("04946cb2-d0f6-485b-a390-fea608737a42")
      //   .handleNotificationOpened(notificationOpenedCallback)
      //   .endInit();

      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    //window["plugins"].OneSignal
  }

  openPage(page) {
    this.menuCtrl.close();
    if (this.pageAtual === page.title) {
    } else {
      this.pageAtual = page.title;
      this.navCtrl.setRoot(page.component);
    }
  }

  public sair() {
    this.storage.deslogar();
    this.menuCtrl.close();
    this.navCtrl.setRoot(LoginPage);
  }



}
