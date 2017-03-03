import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { SolicitacoesPage } from '../pages/solicitacoes/solicitacoes';
import { NovaPublicacaoPage } from '../pages/nova-publicacao/nova-publicacao';
import { Facebook } from 'ionic-native';
import { FacebookService } from '../providers/facebook-service';
import { PublicacaoService } from '../providers/publicacao-service';

//login com o google e com o facebook
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { GooglePlusService } from '../providers/google-plus-service';


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

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCurTBSL6YJBOTu9axp7DJ28yudC56XiX0",
  authDomain: "luizdafeira-fd906.firebaseapp.com",
  databaseURL: "https://luizdafeira-fd906.firebaseio.com",
  storageBucket: "luizdafeira-fd906.appspot.com",
  messagingSenderId: "981479929697"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    SolicitacoesPage,
    NovaPublicacaoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    SolicitacoesPage,
    NovaPublicacaoPage
  ],
  providers: [Facebook, CadastroService, FacebookService, PublicacaoService, {provide: ErrorHandler, useClass: IonicErrorHandler}, GooglePlusService]
})
export class AppModule {}
