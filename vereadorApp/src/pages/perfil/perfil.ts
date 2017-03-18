import { Component } from '@angular/core';
import { NavController, ActionSheetController, NavParams, AlertController, Platform, ToastController, LoadingController, Loading } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Camera } from 'ionic-native';

/*
  Generated class for the Perfil page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  private editar: boolean = false;
  private loading: Loading;
  private loaded: boolean = false;
  private senhaAtual: string = '';
  private confSenha1: string = '';
  private confSenha2: string = '';

  constructor(private toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public events: Events) {}


  //exibe toast
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

   private editarAction() {
    if (this.editar == false) {
      this.editar = true;
    } else if (this.editar == true) {
      //verificação se dejesa cancelar ou salvar
      let confirm = this.alertCtrl.create({
        title: 'Salvar',
        message: 'Deseja salvar as modificações feitas?',
        buttons: [
          {
            text: 'Descartar',
            handler: () => {
              //this.descartar();
            }
          },
          {
            text: 'Salvar',
            handler: () => {
              //this.salvar();
            }
          }]
      });
      confirm.present();
    }
  }

  private alterarFoto() {
    if (this.editar) {
      let confirm = this.alertCtrl.create({
        subTitle: 'Importar imagem da:',
        buttons: [
          {
            text: 'Galeria',
            handler: () => {
              //this.importarFoto();
            }
          },
          {
            text: 'Câmera',
            handler: () => {
             // this.tirarFoto();
            }
          }
        ]
      });
      confirm.present();
    }
  }

}
