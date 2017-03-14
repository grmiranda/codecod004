import { Component } from '@angular/core';
import { PontuacaoService } from '../../providers/pontuacao-service';
import { Usuario } from '../../model/user';

@Component({
  selector: 'page-trofeu-cidadania',
  templateUrl: 'trofeu-cidadania.html'
})
export class TrofeuCidadaniaPage {

  private rank: Usuario[] = [new Usuario(), new Usuario(), new Usuario()];
  private myRank: Usuario = new Usuario();

  constructor(public pontuacaoService: PontuacaoService) {
    this.getMyRank();
    this.getTop3();
  }

  private getTop3(){
    this.pontuacaoService.rankMelhores(3).then(res=>{
      if(!res.error){
        this.rank = res.data;
      }
    });
  }

  private getMyRank(){
    //substituir pelo id do storage
    this.pontuacaoService.getPontuacaoPorID(8).then(res=>{
      console.log(res);
      if(!res.error){
        this.myRank = res.data;
      }
    });
  }


}
