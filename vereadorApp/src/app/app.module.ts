import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { SolicitacoesPage } from '../pages/solicitacoes/solicitacoes';
import { SolicAprovadosPage } from '../pages/solic-aprovados/solic-aprovados';
import { SolicPropostasPage } from '../pages/solic-propostas/solic-propostas';
import { SolicSolicitadosPage } from '../pages/solic-solicitados/solic-solicitados';
import { SolicReprovadosPage } from '../pages/solic-reprovados/solic-reprovados';
import { RequerimentoPage } from '../pages/requerimento/requerimento';
import { AvaliarSolicitacaoPage } from '../pages/avaliar-solicitacao/avaliar-solicitacao';
import { NovaPropostaPage } from '../pages/nova-proposta/nova-proposta';
import { NovaPublicacaoPage } from '../pages/nova-publicacao/nova-publicacao';
import { PublicacaoPage } from '../pages/publicacao/publicacao';
import { EditarPublicacaoPage } from '../pages/editar-publicacao/editar-publicacao';
import { TabProjetosDeLeiPage } from '../pages/tab-projetos-de-lei/tab-projetos-de-lei';
import { PlAndamentoPage } from '../pages/pl-andamento/pl-andamento';
import { PlAprovadosPage } from '../pages/pl-aprovados/pl-aprovados';
import { PlPropostasPage } from '../pages/pl-propostas/pl-propostas';
import { PlRecusadosPage } from '../pages/pl-recusados/pl-recusados';
import { AvaliarPlPage } from '../pages/avaliar-pl/avaliar-pl';
import { NovaPropostaPlPage } from '../pages/nova-proposta-pl/nova-proposta-pl';
import { NovaPlPage } from '../pages/nova-pl/nova-pl';
import { FotoService } from '../providers/foto-service';
import { PublicacaoService } from '../providers/publicacao-service';
import { SolicitacaoService } from '../providers/solicitacao-service';
import { MensagensRecebidasPage } from '../pages/mensagens-recebidas/mensagens-recebidas';
import { MensagensEnviadasPage } from '../pages/mensagens-enviadas/mensagens-enviadas';
import { TabMensagemPage } from '../pages/tab-mensagem/tab-mensagem';
import { EnviarMensagemPage } from '../pages/enviar-mensagem/enviar-mensagem';
import { MensagemService } from '../providers/mensagem-service';
import { ModalListaUsuariosPage } from '../pages/modal-lista-usuarios/modal-lista-usuarios';
import { RequerimentoService } from '../providers/requerimento-service';
import { ModalAbrirMensagemPage } from '../pages/modal-abrir-mensagem/modal-abrir-mensagem';
import { LikeService } from '../providers/like-service';

//push
import { OneSignal } from 'ionic-native';
import { PushService } from '../providers/push-service';



//login com o google e com o facebook
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { GooglePlusService } from '../providers/google-plus-service';
import { Facebook } from 'ionic-native';
import { FacebookService } from '../providers/facebook-service';
import { StorageService } from '../providers/storage';
import { Storage } from '@ionic/storage';
import { BuscaUsuariosService } from '../providers/busca-usuarios-service';

import { CadastroService } from '../providers/cadastro-service';


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'f3c01288'
  },
  'auth': {
    'google': {
      'webClientId': '381691927831-4kh7e0baks3r21nejp4ob45gvmm9guf1.apps.googleusercontent.com',
      'scope': []
    }

  }
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    SolicitacoesPage,
    NovaPublicacaoPage,
    PublicacaoPage,
    EditarPublicacaoPage,
    SolicAprovadosPage,
    SolicPropostasPage,
    SolicReprovadosPage,
    SolicSolicitadosPage,
    NovaPropostaPage,
    AvaliarSolicitacaoPage,
    RequerimentoPage,
    MensagensRecebidasPage,
    MensagensEnviadasPage,
    TabMensagemPage,
    EnviarMensagemPage,
    ModalListaUsuariosPage,
    ModalAbrirMensagemPage,
    TabProjetosDeLeiPage,
    PlAndamentoPage,
    PlAprovadosPage,
    PlPropostasPage,
    PlRecusadosPage,
    AvaliarPlPage,
    NovaPropostaPlPage,
    NovaPlPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    SolicitacoesPage,
    NovaPublicacaoPage,
    PublicacaoPage,
    EditarPublicacaoPage,
    SolicAprovadosPage,
    SolicPropostasPage,
    SolicReprovadosPage,
    SolicSolicitadosPage,
    NovaPropostaPage,
    AvaliarSolicitacaoPage,
    RequerimentoPage,
    MensagensRecebidasPage,
    MensagensEnviadasPage,
    TabMensagemPage,
    EnviarMensagemPage,
    ModalListaUsuariosPage,
    ModalAbrirMensagemPage,
    TabProjetosDeLeiPage,
    PlAndamentoPage,
    PlAprovadosPage,
    PlPropostasPage,
    PlRecusadosPage,
    AvaliarPlPage,
    NovaPropostaPlPage,
    NovaPlPage
  ],

  providers: [Facebook, MensagemService, PushService, OneSignal, BuscaUsuariosService, Storage, StorageService, CadastroService, LikeService, FotoService, FacebookService, PublicacaoService, SolicitacaoService, RequerimentoService, {provide: ErrorHandler, useClass: IonicErrorHandler}, GooglePlusService]


})
export class AppModule {}
