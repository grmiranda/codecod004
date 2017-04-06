import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SocialSharing } from 'ionic-native';
import { ToastController } from 'ionic-angular';
import { Facebook } from 'ionic-native';


/*
  Generated class for the ShareService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ShareService {

  constructor(public http: Http, private toastCtrl: ToastController) {
    console.log('Hello ShareService Provider');
  }

  /**
   * file pode ser uma imgagem
  */
  public compartilhar(mensagem: string, subject: string, file: string, url: string) {
    SocialSharing.share(mensagem, subject, file, url).then(() => {
      let toast = this.toastCtrl.create({
        message: 'Compartilhado com sucesso',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    });
  }

  public compartilharFacebook(message, subject, image, url) {
    alert(image.data);
    Facebook.showDialog(
      {
        method: "share",
        href: "https://www.facebook.com/luizdafeirapagina/?hc_ref=NEWSFEED",
        caption: message,
        description: subject,
        picture: image
      }).then(() => {
        let toast = this.toastCtrl.create({
          message: 'Compartilhado com sucesso',
          duration: 3000,
          position: 'bottom'
        });

        toast.present();
      });

    /*
    SocialSharing.shareViaFacebook(message, image, url).then(() => {
      let toast = this.toastCtrl.create({
        message: 'Compartilhado com sucesso',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    });
    */
  }

  public compartilharTwitter(message, image, url) {
    SocialSharing.shareViaTwitter(message, image, url).then(() => {
      let toast = this.toastCtrl.create({
        message: 'Compartilhado com sucesso',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    });
  }

  public compartilharInstagram(message, image) {
    SocialSharing.shareViaInstagram(message, image).then(() => {
      let toast = this.toastCtrl.create({
        message: 'Compartilhado com sucesso',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    });
  }

  public compartilharWhatsApp(message, image, url) {
    SocialSharing.shareViaWhatsApp(message, image, url).then(() => {
      let toast = this.toastCtrl.create({
        message: 'Compartilhado com sucesso',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    });
  }

  public compartilharEmail(message, subject, image, url) {
    if (url == null) {
      SocialSharing.shareViaEmail(message, subject, null, null, null, image).then(() => {
        let toast = this.toastCtrl.create({
          message: 'Compartilhado com sucesso',
          duration: 3000,
          position: 'bottom'
        });

        toast.present();
      });
    } else {
      SocialSharing.shareViaEmail(message, subject + "Acesse: " + url, null, null, null, image).then(() => {
        let toast = this.toastCtrl.create({
          message: 'Compartilhado com sucesso',
          duration: 3000,
          position: 'bottom'
        });

        toast.present();
      });
    }
  }



}
