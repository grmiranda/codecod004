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
import { AgendaPage } from '../pages/agenda/agenda';
import { TrofeuCidadaniaPage } from '../pages/trofeu-cidadania/trofeu-cidadania';
import { CategoriasPage } from '../pages/categorias/categorias';
import { Usuario } from '../model/user';
import { InformacaoPage } from '../pages/informacao/informacao';
import { Http, Headers } from '@angular/http';
import { PerfilPage } from '../pages/perfil/perfil';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;


  rootPage = SolicitacoesPage;
  pages: Array<{ title: string, component: any }>;
  pageAtual: string;
  private headers = new Headers({ 'Content-Type': 'application/json' });


  constructor(platform: Platform,
    public menuCtrl: MenuController,
    private storage: StorageService,
    private http: Http
  ) {
    this.pages = [{ title: 'Notícias', component: HomePage },
    { title: 'Solicitações', component: SolicitacoesPage },
    { title: 'Avaliar Solicitação', component: AvaliarSolicitacaoPage },
    { title: 'Projetos de Lei', component: TabProjetosDeLeiPage },
    { title: 'Avaliar Proposta', component: AvaliarPlPage },
    { title: 'Mensagem', component: TabMensagemPage },
    { title: 'Agenda', component: AgendaPage },
    { title: 'Informações úteis', component: InformacaoPage },
    { title: 'Telefones Úteis', component: CategoriasPage },
    { title: 'Troféu Cidadania', component: TrofeuCidadaniaPage }]

    this.pageAtual = 'Notícias';

    platform.ready().then(() => {
      var notificationOpenedCallback = function (jsonData) {
      };

      window["plugins"].OneSignal
        .startInit("04946cb2-d0f6-485b-a390-fea608737a42")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPerfil(){
     this.menuCtrl.close();
     this.navCtrl.setRoot(PerfilPage);
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
    this.storage.get().then(res => {
      this.http.post("http://dsoutlet.com.br/apiLuiz/logout.php", JSON.stringify(res.socialID), { headers: this.headers }).toPromise().then(res => {
        if (res.json() == true) {
          this.storage.deslogar();
          this.menuCtrl.close();
          this.navCtrl.setRoot(LoginPage);
        }
      }).catch(() => alert("Erro ao se conectar com o servidor"));
    }).catch(() => alert("Erro ao deslogar"));
  }

}
