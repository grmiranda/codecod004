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
import { BoasVindasPage } from '../pages/boas-vindas/boas-vindas';
import { SolicitacaoTabsPage } from '../pages/solicitacao-tabs/solicitacao-tabs';
import { PlTabsPage } from '../pages/pl-tabs/pl-tabs';
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
import { CategoriasTelefonePage } from '../pages/categorias-telefone/categorias-telefone';
import { TrofeuCidadaniaPage } from '../pages/trofeu-cidadania/trofeu-cidadania';
import { AdicionarPropostaPage } from '../pages/adicionar-proposta/adicionar-proposta';
import { SolicitarPropostaPage } from '../pages/solicitar-proposta/solicitar-proposta';
import { AdicionarSolicitacaoPage } from '../pages/adicionar-solicitacao/adicionar-solicitacao';
import { AvaliarPlPage } from '../pages/avaliar-pl/avaliar-pl';
import { AdicionarPropostaPlPage } from '../pages/adicionar-proposta-pl/adicionar-proposta-pl';
import { AdicionarPlPage } from '../pages/adicionar-pl/adicionar-pl';
import { AprovadosPlPage } from '../pages/aprovados-pl/aprovados-pl';
import { AbrirFeedPage } from '../pages/abrir-feed/abrir-feed';
import { DepoimentosPage } from '../pages/depoimentos/depoimentos';


@NgModule({
  declarations: [
    BoasVindasPage,
    AprovadosPlPage,
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
    SolicitacaoTabsPage,
    LoginEmailPage,
    CadastrarUsuarioPage,
    EsqueciSenhaPage,
    AprovadosPage,
    RecusadosPage,
    SolicitadosPage,
    PropostasPage,
    AdicionarPropostaPage,
    SolicitarPropostaPage,
    AdicionarSolicitacaoPage,
    AvaliarPlPage,
    PlTabsPage,
    AdicionarPropostaPlPage,
    AdicionarPlPage,
    CategoriasTelefonePage,
    AbrirFeedPage,
    DepoimentosPage

  ],
  imports: [
    ElasticModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    BoasVindasPage,
    AprovadosPlPage,
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
    SolicitacaoTabsPage,
    LoginEmailPage,
    CadastrarUsuarioPage,
    EsqueciSenhaPage,
    AprovadosPage,
    RecusadosPage,
    SolicitadosPage,
    PropostasPage,
    AdicionarPropostaPage,
    SolicitarPropostaPage,
    AdicionarSolicitacaoPage,
    AvaliarPlPage,
    PlTabsPage,
    AdicionarPropostaPlPage,
    AdicionarPlPage,
    CategoriasTelefonePage,
    AbrirFeedPage,
    DepoimentosPage
    
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
