import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { Facebook } from 'ionic-native';
import { FacebookService } from '../providers/facebook-service';
import { FirebaseService } from '../providers/firebase-service';

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
    CadastroPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage
  ],
  providers: [Facebook, FacebookService, {provide: ErrorHandler, useClass: IonicErrorHandler}, FirebaseService]
})
export class AppModule {}
