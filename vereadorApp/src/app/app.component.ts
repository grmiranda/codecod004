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
  rootPage = HomePage;
  pages: Array<{title: string, component: any}>;
  pageAtual: string;

  constructor(platform: Platform,
    public menuCtrl: MenuController) {
    this.pages = [{title: 'Notíticas', component: HomePage},
                  {title: 'Solicitações', component: SolicitacoesPage}]
    this.pageAtual = 'Notícias';

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    if(this.pageAtual === page.title){
      this.menuCtrl.close();
    } else {
      this.pageAtual = page.title;
      this.navCtrl.setRoot(page.component);
      this.menuCtrl.close();
    }
  }

  public sair(){
    this.navCtrl.setRoot(LoginPage);
    this.menuCtrl.close();
  }



}
