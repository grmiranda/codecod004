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


@NgModule({
  declarations: [
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
