import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
//paginas do Side Menu
import { AndamentoPLPage } from '../pages/andamento-pl/andamento-pl';
import { AvaliarPropostaPage } from '../pages/avaliar-proposta/avaliar-proposta';
import { HistoriaVereadorPage } from '../pages/historia-vereador/historia-vereador';
import { PerfilPage } from '../pages/perfil/perfil';
import { SobrePage } from '../pages/sobre/sobre';
import { SolicitacaoPLPage } from '../pages/solicitacao-pl/solicitacao-pl';
import { TelefonesUteisPage } from '../pages/telefones-uteis/telefones-uteis';
import { TrofeuCidadaniaPage } from '../pages/trofeu-cidadania/trofeu-cidadania';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = LoginPage;
  //paginas do side Nav
  perfil = PerfilPage;
  projetosPL = AndamentoPLPage;
  sugestaoPL = SolicitacaoPLPage;
  avaliar = AvaliarPropostaPage;
  trofeu = TrofeuCidadaniaPage;
  telefones = TelefonesUteisPage;
  historia = HistoriaVereadorPage;
  sobre = SobrePage;
  sair = LoginPage

  constructor(platform: Platform, public menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(pagina: string){
    if(pagina == 'perfil'){
      this.nav.push(this.perfil);
      this.menu.close();
    }else if(pagina == 'projetosPL'){
      this.nav.push(this.projetosPL);
      this.menu.close();
    }else if(pagina == 'sugestaoPL'){
      this.nav.push(this.sugestaoPL);
      this.menu.close();
    }else if(pagina == 'avaliar'){
      this.nav.push(this.avaliar);
      this.menu.close();
    }else if(pagina == 'trofeu'){
      this.nav.push(this.trofeu);
      this.menu.close();
    }else if(pagina == 'telefones'){
      this.nav.push(this.telefones);
      this.menu.close();
    }else if(pagina == 'historia'){
      this.nav.push(this.historia);
      this.menu.close();
    }else if(pagina == 'sobre'){
      this.nav.push(this.sobre);
      this.menu.close();
    }else if(pagina == 'sair'){
      this.nav.push(this.sair);
      this.menu.close();
    }

  }
}
