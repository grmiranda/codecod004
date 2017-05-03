import { Injectable } from '@angular/core';
import { Camera } from 'ionic-native';

@Injectable()
export class FotoService {

  constructor() {
  }

  public importarFoto(): Promise<string> {
    return Camera.getPicture({
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      saveToPhotoAlbum: false
    }).then(imageData => ("data:image/jpeg;base64," + imageData), error => ('false'));
  }

  public tirarFoto(): Promise<string> {
    return Camera.getPicture({
      quality: 75, //Picture quality in range 0-100. Default is 50
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      saveToPhotoAlbum: true
    }).then(imageData => ("data:image/jpeg;base64," + imageData), error => ('false'));
  }

}
