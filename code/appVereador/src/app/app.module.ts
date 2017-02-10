import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ElasticModule } from 'angular2-elastic';
//loginPage
import { LoginPage } from '../pages/login/login';
import { LoginEmailPage } from '../pages/login-email/login-email';
import { CadastrarUsuarioPage } from '../pages/cadastrar-usuario/cadastrar-usuario';
import { EsqueciSenhaPage } from '../pages/esqueci-senha/esqueci-senha';
//Telas Inicio
import { InicioTabsPage } from '../pages/inicio-tabs/inicio-tabs';
import { AprovadosPage } from '../pages/aprovados/aprovados';
import { RecusadosPage } from '../pages/recusados/recusados';
import { SolicitadosPage } from '../pages/solicitados/solicitados';
import { PropostasPage } from '../pages/propostas/propostas';
import { AndamentoPLPage } from '../pages/andamento-pl/andamento-pl';
import { AvaliarPropostaPage } from '../pages/avaliar-proposta/avaliar-proposta';
import { HistoriaVereadorPage } from '../pages/historia-vereador/historia-vereador';
import { PerfilPage } from '../pages/perfil/perfil';
import { SobrePage } from '../pages/sobre/sobre';
import { SolicitacaoPLPage } from '../pages/solicitacao-pl/solicitacao-pl';
import { TelefonesUteisPage } from '../pages/telefones-uteis/telefones-uteis';
import { TrofeuCidadaniaPage } from '../pages/trofeu-cidadania/trofeu-cidadania';


@NgModule({
  declarations: [
    AndamentoPLPage,
    AvaliarPropostaPage,
    HistoriaVereadorPage,
    PerfilPage,
    SobrePage,
    SolicitacaoPLPage,
    TelefonesUteisPage,
    TrofeuCidadaniaPage,
    MyApp,
    LoginPage,
    InicioTabsPage,
    LoginEmailPage,
    CadastrarUsuarioPage,
    EsqueciSenhaPage,
    AprovadosPage,
    RecusadosPage,
    SolicitadosPage,
    PropostasPage

  ],
  imports: [
    ElasticModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AndamentoPLPage,
    AvaliarPropostaPage,
    HistoriaVereadorPage,
    PerfilPage,
    SobrePage,
    SolicitacaoPLPage,
    TelefonesUteisPage,
    TrofeuCidadaniaPage,
    MyApp,
    LoginPage,
    InicioTabsPage,
    LoginEmailPage,
    CadastrarUsuarioPage,
    EsqueciSenhaPage,
    AprovadosPage,
    RecusadosPage,
    SolicitadosPage,
    PropostasPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
