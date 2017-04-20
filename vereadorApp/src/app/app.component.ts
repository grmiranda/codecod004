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

  pageAtual: any;
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

  constructor(private platform: Platform,
    public menuCtrl: MenuController,
    private toastCtrl: ToastController,
    private storageService: StorageService,
    private http: Http,
    public events: Events
  ) {

     this.storageService.get().then(userAtual => {
       if (userAtual) {
         this.permissao = userAtual.permissao;
         if (userAtual.nome) {
           this.navCtrl.setRoot(HomePage);
         } else {
           this.navCtrl.setRoot(LoginPage);
         }
         Splashscreen.hide();
         this.events.publish('user:changed', userAtual);
       } else {
         this.navCtrl.setRoot(LoginPage);
       }
     });

    platform.ready().then(() => {
      var notificationOpenedCallback = function(jsonData) {
      };

      // platform.registerBackButtonAction(() => {
      //   console.log(this.navCtrl.getActive().name);
      //   // console.log(this.navCtrl.getActiveChildNav().name);
      // }, 100);

      window["plugins"].OneSignal
        .startInit("04946cb2-d0f6-485b-a390-fea608737a42")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();

      StatusBar.styleDefault();

      events.subscribe('user:changed', user => {
        if (user !== undefined && user !== null) {
          this.nome = user.nome;
          this.foto = user.fotoURL;
        }
      });
    });
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
    this.pageAtual = "Perfil";
    this.navCtrl.push(PerfilPage);
  }

  private openPage(page) {
    this.menuCtrl.close();
    if (this.pageAtual === page) {
    } else {
      this.pageAtual = page;
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
