import { Component } from '@angular/core';
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
  private myID = 8;


  constructor(private storage: StorageService, private pontuacaoService: PontuacaoService) {
  }

  ionViewWillEnter() {
    // this.storage.get().then(res => {
    //  this.myID = res.IDUsuario;
    //   this.getMyRank();
    //   this.getTop3();
    // });
  }

  private getTop3() {
    this.pontuacaoService.rankMelhores(this.myID).then(res => {
      if (!res.error) {
        this.rank = res.data;
      }
    });
  }

  private getMyRank() {
    this.pontuacaoService.getPontuacaoPorID(this.myID).then(res => {
      if (!res.error) {
        this.myRank = res.data;
      }
    });
  }
}
