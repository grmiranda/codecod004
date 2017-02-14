import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

/*
  Generated class for the AvaliarPl page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-avaliar-pl',
  templateUrl: 'avaliar-pl.html'
})
export class AvaliarPlPage {

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaliarPlPage');
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Recusar',
      message: "Deseja enviar alguma mensagem para o usuario?",
      inputs: [
        {
          name: 'Mensagem',
          placeholder: 'Mensagem'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}
