import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { NovaPropostaPlPage } from '../nova-proposta-pl/nova-proposta-pl';
import { NovaPlPage } from '../nova-pl/nova-pl';
import { ProjetoDeLeiService } from '../../providers/pl-service';
import { StorageService } from '../../providers/storage';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
import { LikeService } from '../../providers/like-service';
import { LikeProjetoDeLei } from '../../model/like-projeto-de-lei';


@Component({
  selector: 'page-pl-propostas',
  templateUrl: 'pl-propostas.html'
})
export class PlPropostasPage {

  private pls: any[] = [];
  private myID = 8;

  constructor(public projetoDeLeiService: ProjetoDeLeiService,
    public likeService: LikeService,
    public storage: StorageService,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform) {

    }

    ionViewWillEnter() {
      // this.storage.get().then(res => {
      //   this.myID = res.IDUsuario;
        this.carregarPropostas();
      // });
    }

    private carregarPropostas() {
      this.projetoDeLeiService.getProjetosDeLeiLikes('ap', this.myID).then(res => {
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
        //error
      }
    })
  }

  private like(projetodelei, tipo:string) {
    projetodelei.t = projetodelei.t == tipo ? 'u' : tipo;
    this.likeService.addLikeProjetoDeLei(new LikeProjetoDeLei(tipo, this.myID, projetodelei.pl.IDPL, projetodelei.pl.IDUsuario)).then(res => {
      projetodelei.p = res.value.p;
      projetodelei.n = res.value.n;
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
