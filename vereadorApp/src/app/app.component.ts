import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { StorageService } from '../providers/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { SolicitacoesPage } from '../pages/solicitacoes/solicitacoes';
import { AvaliarSolicitacaoPage } from '../pages/avaliar-solicitacao/avaliar-solicitacao';
import { TabMensagemPage } from '../pages/tab-mensagem/tab-mensagem';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage = SolicitacoesPage;
  pages: Array<{ title: string, component: any }>;
  pageAtual: string;

  constructor(platform: Platform,
    public menuCtrl: MenuController,
    private storage : StorageService
    ) {
    this.pages = [{ title: 'Notícias', component: HomePage },
    { title: 'Solicitações', component: SolicitacoesPage },
    { title: 'Avaliar Solicitação', component: AvaliarSolicitacaoPage},
    { title: 'Mensagem', component: TabMensagemPage}]
    this.pageAtual = 'Notícias';

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
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
