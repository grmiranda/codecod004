import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PushNotificationService } from '../providers/push-notification-service';
import { FirebaseService } from '../providers/firebase-service';
import { CadastroPage } from '../pages/cadastro/cadastro';


//angularfire2 - comunicação com o banco de dados e login com face e gmail
import { AngularFireModule } from 'angularfire2';
import { FacebookService } from '../providers/facebook-service';
import { Facebook } from 'ionic-native';

// constante de configuração da base de dados
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
    CadastroPage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CadastroPage,
    LoginPage
  ],

  providers: [PushNotificationService, {provide: ErrorHandler, useClass: IonicErrorHandler}, FacebookService, Facebook, FirebaseService, PushNotificationService]

})
export class AppModule {}
