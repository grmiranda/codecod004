import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      var notificationOpenedCallback = function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window["plugins"].OneSignal
        .startInit("04946cb2-d0f6-485b-a390-fea608737a42")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
