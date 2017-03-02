import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PublicacaoService } from '../../providers/publicacao-service';
import { Publicacao } from '../../model/publicacao';
import { Camera } from 'ionic-native';

@Component({
  selector: 'page-nova-publicacao',
  templateUrl: 'nova-publicacao.html'
})
export class NovaPublicacaoPage {

  private publicacao: Publicacao = new Publicacao();

  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public publicacaoService: PublicacaoService) {

  }

  private publicar() {
    alert(JSON.stringify(this.publicacao));
    this.publicacaoService.addPublicacao(this.publicacao).then(res => {
      if (!res.error) {
        if (res.value) {
          this.navCtrl.pop();
        } else {
          //retornou false
        }
      } else {
        //error de conexao
      }
    });
  }

  private importarFoto() {
    Camera.getPicture({
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    }).then(imageData => {
      this.publicacao.fotoURL = "data:image/jpeg;base64," + imageData;
    }, error => {
      alert("ERROR -> " + JSON.stringify(error));
    });
  }

  private tirarFoto() {
    Camera.getPicture({
      quality: 75, //Picture quality in range 0-100. Default is 50
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.publicacao.fotoURL = "data:image/jpeg;base64," + imageData;
    }, error => {
      alert("ERROR -> " + JSON.stringify(error));
    });
  }

}
