import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { SolicitacoesPage } from '../pages/solicitacoes/solicitacoes';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage = LoginPage;
  pages: Array<{ title: string, component: any }>;
  pageAtual: string;

  constructor(platform: Platform,
    public menuCtrl: MenuController) {
    this.pages = [{ title: 'Notíticas', component: HomePage },
    { title: 'Solicitações', component: SolicitacoesPage }]
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

    this.menuCtrl.close();
    this.navCtrl.setRoot(LoginPage);
  }



}
