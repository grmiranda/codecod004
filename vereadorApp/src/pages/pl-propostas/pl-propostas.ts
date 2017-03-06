import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { NovaPropostaPlPage } from '../nova-proposta-pl/nova-proposta-pl';
import { NovaPlPage } from '../nova-pl/nova-pl';
import { ProjetoDeLeiService } from '../../providers/pl-service';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
import { LikeService } from '../../providers/like-service';
import { LikeProjetoDeLei } from '../../model/like-projeto-de-lei';


@Component({
  selector: 'page-pl-propostas',
  templateUrl: 'pl-propostas.html'
})
export class PlPropostasPage {

  public pls: ProjetoDeLei[] = [];

  constructor(public projetoDeLeiService: ProjetoDeLeiService,
    public likeService: LikeService,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform) {

    }

    ionViewWillEnter() {
      this.carregarPropostas();
    }

    private carregarPropostas() {
      this.projetoDeLeiService.getProjetosDeLei('ap').then(res => {
        if (!res.error) {
          this.pls = res.data;
        }
      })
    }

  private novaProposta(){
    this.navCtrl.push(NovaPropostaPlPage);
  }

  private reprovar(pl: ProjetoDeLei) {
    pl.estado = 'pr';
    this.projetoDeLeiService.editProjetoDeLei(pl).then(res => {
      if (!res.error) {
        //removeu
        this.carregarPropostas();

      } else {
        //rror
      }
    })
  }

  private like(pl: ProjetoDeLei) {
    this.likeService.addLikeProjetoDeLei(new LikeProjetoDeLei('s', pl.IDPL, pl.IDUsuario)).then(res => {
      if (!res.error && res.value) {
        //works fine
        console.log('works');
      } else if (res.error) {
        //error
      } else {
        console.log('ja curtiu');
      }
    });
  }

  private dislike(pl: ProjetoDeLei) {
    this.likeService.addLikeProjetoDeLei(new LikeProjetoDeLei('n', pl.IDPL, pl.IDUsuario)).then(res => {
      if (!res.error && res.value) {
        //works fine
        console.log('works');
      } else if (res.error) {
        //error
      } else {
        console.log('ja curtiu');
      }
    });
  }

   private abrirOpcoes(pl: ProjetoDeLei) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Reprovar',
          role: 'destructive',
          handler: () => {
            this.reprovar(pl);
          }
        },
        {
          text: 'Adicionar Projeto de Lei',
          handler: () => {
            this.navCtrl.push(NovaPlPage, {pl: pl});
          }
        },
        {
          text: 'Cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
}
