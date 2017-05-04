import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, Events, ToastController } from 'ionic-angular';
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
import { NovaPropostaPlPage } from '../pages/nova-proposta-pl/nova-proposta-pl';
import { HistoriaPage } from '../pages/historia/historia';
import { DepoimentoPage } from '../pages/depoimento/depoimento';
import { AvaliarDepoimentoPage } from '../pages/avaliar-depoimento/avaliar-depoimento';
import { RequerimentoPage } from '../pages/requerimento/requerimento';


import { Publicacao } from '../model/publicacao';
import { ProjetoDeLei } from '../model/projeto-de-lei';
import { Solicitacao } from '../model/solicitacao';

import { PublicacaoPage } from '../pages/publicacao/publicacao';
import { VisualizarPlPage } from '../pages/visualizar-pl/visualizar-pl';
import { VisualizarSolicitacaoPage } from '../pages/visualizar-solicitacao/visualizar-solicitacao';
import { BuscaUsuarioPage } from '../pages/busca-usuario/busca-usuario';

import { BadgesService } from '../providers/badges-service';
// Branch import
declare var Branch;

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  private bloqueia: boolean = false;

  rootPage;

  private menuAdm: boolean = false;
  private menuInfo: boolean = false;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private nome: string = "";
  private foto: string = "";
  private permissao: number = 0;
  private countTimerForCloseApp: boolean = false;
  private msg = 0;
  private pl = 0;
  private solicitacao = 0;
  private depoimento = 0;
  private id = "0";

  homePage = HomePage;
  solicitacoesPage = SolicitacoesPage;
  tabProjetosDeLeiPage = TabProjetosDeLeiPage;
  tabMensagemPage = TabMensagemPage;
  agendaPage = AgendaPage;
  trofeuCidadaniaPage = TrofeuCidadaniaPage;
  historiaPage = HistoriaPage;
  depoimentoPage = DepoimentoPage;
  avaliarSolicitacaoPage = AvaliarSolicitacaoPage;
  avaliarPlPage = AvaliarPlPage;
  avaliarDepoimentoPage = AvaliarDepoimentoPage;
  informacaoPage = InformacaoPage;
  categoriasPage = CategoriasPage;
  buscaUsuario = BuscaUsuarioPage;

  constructor(
    private platform: Platform,
    public menuCtrl: MenuController,
    private toastCtrl: ToastController,
    private storageService: StorageService,
    private http: Http,
    public events: Events,
    public badgesService: BadgesService
  ) {

    this.storageService.get().then(userAtual => {
      if (userAtual.IDUsuario != undefined && userAtual.IDUsuario != "0") {
        this.id = userAtual.IDUsuario;   
        this.badgesService.publicar(this.id);
      }
      if (userAtual) {
        this.permissao = userAtual.permissao;
        if (userAtual.nome) {
          this.navCtrl.setRoot(HomePage);
          branchInit();
        } else {
          this.navCtrl.setRoot(LoginPage);
          branchInit();
        }
        this.events.publish('user:changed', userAtual);
      } else {
        this.navCtrl.setRoot(LoginPage);
        branchInit();
      }
      Splashscreen.hide();
    });
    platform.ready().then(() => {
      var notificationOpenedCallback = function (jsonData) {
        this.storageService.get().then(userAtual =>  this.badgesService.publicar(userAtual.IDUsuario));        
      };

      window["plugins"].OneSignal
        .startInit("04946cb2-d0f6-485b-a390-fea608737a42")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();

      StatusBar.styleDefault();

      events.subscribe('user:changed', user => {
        if (user !== undefined && user !== null) {
          this.nome = user.nome;
          this.foto = user.fotoURL;
          this.permissao = user.permissao;
        }
      });

      events.subscribe('badges', badges => {
        this.msg = badges.mensagens;
        this.pl = badges.pl;
        this.solicitacao = badges.solicitacao;
        this.depoimento = badges.depoimento;
      });

      events.subscribe('banido', () => {
        this.sair();
      });
    });

    platform.resume.subscribe(() => {
      branchInit();
    });
    // Branch initialization
    const branchInit = () => {
      // only on devices
      if (platform.is('core')) { return }
      Branch.initSession(data => {
        // read deep link data on click
        let url = data.url.split("-");

        if (url[0] == "publicacao") {
          let publicacaoAtual = new Publicacao();
          publicacaoAtual.IDPublicacao = url[1];
          this.navCtrl.push(PublicacaoPage, { publicacao: publicacaoAtual })
        } else if (url[0] == "pl") {
          let pl = new ProjetoDeLei();
          pl.IDPL = url[1];
          this.navCtrl.push(VisualizarPlPage, { pl: pl })
        } else if (url[0] == "solicitacao") {
          let solicitacao = new Solicitacao();
          solicitacao.IDSolicitacao = url[1];
          this.navCtrl.push(VisualizarSolicitacaoPage, { solicitacao: solicitacao })
        }

      });
    }
  }


  private showConfirm() {
    if (this.countTimerForCloseApp) {
      this.platform.exitApp();
    } else {
      this.countTimerForCloseApp = true;
      this.displayToast('Pressione novamente para sair');
      let timeout = setTimeout(() => {
        this.countTimerForCloseApp = false;
      }, 2000);
    }

  }

  private displayToast(mensagem) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  private openPerfil() {
    this.menuCtrl.close();
    this.navCtrl.push(PerfilPage);
  }

  private openPage(page) {
    this.menuCtrl.close();
    if (page == HomePage) {
      this.navCtrl.setRoot(page);
    } else {
      this.navCtrl.push(page);
    }

  }

  public sair() {
    this.bloqueia = true;
    this.storageService.get().then(res => {
      this.http.post("http://dsoutlet.com.br/apiLuiz/logout.php", JSON.stringify(res.socialID), { headers: this.headers }).toPromise().then(res => {
        if (res.json() == true) {
          this.storageService.deslogar();
          this.menuCtrl.close();
          this.navCtrl.setRoot(LoginPage);
        }
        this.bloqueia = false;
      }).catch(() => this.displayToast("Erro ao se conectar com o servidor"));
    }).catch(() => {
      this.displayToast("Erro ao deslogar")
      this.bloqueia = false;
    });
  }

}
