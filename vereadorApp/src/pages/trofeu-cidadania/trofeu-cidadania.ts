import { Component } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { PontuacaoService } from '../../providers/pontuacao-service';
import { Usuario } from '../../model/user';
import { StorageService } from '../../providers/storage';

@Component({
  selector: 'page-trofeu-cidadania',
  templateUrl: 'trofeu-cidadania.html'
})
export class TrofeuCidadaniaPage {

  private rank: Usuario[] = [new Usuario(), new Usuario(), new Usuario()];
  private myRank: Usuario = new Usuario();
  private myID;
  private loading = this.loadingCtrl.create({
    content: 'Carregando'
  });

  constructor(private storage: StorageService, private pontuacaoService: PontuacaoService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {

  }

  ionViewWillEnter() {
    this.loading.present();
    this.storage.get().then(res => {
      this.myID = res.IDUsuario;
      this.getMyRank();
      this.getTop3();
    });
  }

  private getTop3() {
    this.pontuacaoService.rankMelhores(this.myID).then(res => {
      this.loading.dismiss();
      if (!res.error) {
        this.rank = res.data;
      }
    });
  }

  private getMyRank() {
    this.pontuacaoService.getPontuacaoPorID(this.myID).then(res => {
      if (!res.error) {
        this.myRank = res.data;
      } else {
        this.tentarNovamente();
      }
    });
  }

  private tentarNovamente() {
    let confirm = this.alertCtrl.create({
      title: 'Falha na conexão',
      message: 'Tentar Novamente ?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Ok',
          handler: () => {
            this.getMyRank();
            this.getTop3();
          }
        }
      ]
    });
    confirm.present();
  }

}
