import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ShareService } from '../../providers/share-service';

/*
  Generated class for the ModalOpcoes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-compartilhar',
  templateUrl: 'compartilhar.html'
})
export class CompartilharPage {
  private titulo: string;
  private subtitulo: string;
  private foto: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    private shareService: ShareService
  ) {
    this.titulo = this.navParams.get('titulo');
    this.subtitulo = this.navParams.get('subtitulo');
    this.foto = this.navParams.get('foto');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalOpcoesPage');
  }

  cancel() {
    this.view.dismiss()
  }


  compartilharFacebook() {
    this.shareService.compartilharFacebook(this.titulo, this.subtitulo, this.foto, null);
    this.view.dismiss()
  }

  compartilharTwitter(){
    this.shareService.compartilharTwitter(this.titulo, this.foto, null);
    this.view.dismiss()
  }
  
  compartilharInstagram(){
    this.shareService.compartilharInstagram(this.titulo, this.foto);
    this.view.dismiss();
  }

  compartilharWhatsApp(){
    this.shareService.compartilharWhatsApp(this.titulo, this.foto, null);
    this.view.dismiss()
  }

  compartilharEmail(){
    this.shareService.compartilharEmail(this.titulo, this.subtitulo, this.foto, null);
    this.view.dismiss()
  }

  compartilharOutros(){
    this.shareService.compartilhar(this.titulo, this.subtitulo, this.foto, null);
  }

}
