import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PushNotificationService } from '../providers/push-notification-service';
import { Facebook } from 'ionic-native';
import { FacebookService} from '../providers/facebook-service';

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
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
<<<<<<< HEAD
  providers: [PushNotificationService, PushNotificationService, Facebook, {provide: ErrorHandler, useClass: IonicErrorHandler}]
=======
  providers: [PushNotificationService, {provide: ErrorHandler, useClass: IonicErrorHandler}, FacebookService, Facebook]
>>>>>>> 4143e7300c39961e007f36d7c5116c87d2f77cda
})
export class AppModule {}
