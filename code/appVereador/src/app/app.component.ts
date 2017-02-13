import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
//paginas do Side Menu
import { PlTabsPage } from '../pages/pl-tabs/pl-tabs';
import { AvaliarPropostaPage } from '../pages/avaliar-proposta/avaliar-proposta';
import { HistoriaVereadorPage } from '../pages/historia-vereador/historia-vereador';
import { PerfilPage } from '../pages/perfil/perfil';
import { SobrePage } from '../pages/sobre/sobre';
import { TrofeuCidadaniaPage } from '../pages/trofeu-cidadania/trofeu-cidadania';
import { AvaliarPlPage } from '../pages/avaliar-pl/avaliar-pl';
import { SolicitacaoTabsPage } from '../pages/solicitacao-tabs/solicitacao-tabs';
import { CategoriasTelefonePage } from '../pages/categorias-telefone/categorias-telefone';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = LoginPage;
  //paginas do side Nav
  perfil = PerfilPage;
  solicitacoes = SolicitacaoTabsPage;
  projetosPL = PlTabsPage;
  
  avaliar = AvaliarPropostaPage;
  trofeu = TrofeuCidadaniaPage;
  telefones = CategoriasTelefonePage;
  historia = HistoriaVereadorPage;
  sobre = SobrePage;
  avaliarPL = AvaliarPlPage;
  

  constructor(platform: Platform, public menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(pagina: any){
    if(pagina == 'perfil'){
      this.nav.setRoot(this.perfil);
    }else if(pagina == 'solicitacoes'){
      this.nav.setRoot(this.solicitacoes);
    }else if(pagina == 'projetosPL'){
      this.nav.setRoot(this.projetosPL);
    }else if(pagina == 'avaliar'){
      this.nav.setRoot(this.avaliar);
    }else if(pagina == 'avaliarPL'){
      this.nav.setRoot(this.avaliarPL);
    }else if(pagina == 'trofeu'){
      this.nav.setRoot(this.trofeu);
    }else if(pagina == 'telefones'){
      this.nav.setRoot(this.telefones);
    }else if(pagina == 'historia'){
      this.nav.setRoot(this.historia);
    }else if(pagina == 'sobre'){
      this.nav.setRoot(this.sobre);
    }else if(pagina == 'sair'){
      this.nav.setRoot(this.rootPage);
    }
    this.menu.close();
  }
}
