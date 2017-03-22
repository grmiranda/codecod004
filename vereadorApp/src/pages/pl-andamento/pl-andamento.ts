import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform  } from 'ionic-angular';
import { ProjetoDeLeiService } from '../../providers/pl-service';
import { StorageService } from '../../providers/storage';
import { LikeService } from '../../providers/like-service';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
import { NovaPlPage } from '../nova-pl/nova-pl';
import { LikeProjetoDeLei } from '../../model/like-projeto-de-lei';

@Component({
  selector: 'page-pl-andamento',
  templateUrl: 'pl-andamento.html'
})
export class PlAndamentoPage {

  private pls: any[] = [];
  private myID = 8;

  constructor(public navCtrl: NavController,
    public likeService: LikeService,
    public projetoDeLeiService: ProjetoDeLeiService,
    public storage: StorageService,
    public navParams: NavParams,
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
    this.projetoDeLeiService.getProjetosDeLeiLikes('tr', this.myID).then(res => {
      if (!res.error) {
        this.pls = res.data;
      }
    });
  }

  private novoPL() {
    this.navCtrl.push(NovaPlPage);
  }

  private aprovar(pl: ProjetoDeLei) {
    pl.estado = 'cp';
    this.projetoDeLeiService.editProjetoDeLei(pl).then(res => {
      if (!res.error && res.value) {
        //works fine
        this.carregarPropostas();
      } else {
        //error
      }
    });
  }

  private reprovar(pl: ProjetoDeLei) {
    pl.estado = 'cn';
    this.projetoDeLeiService.editProjetoDeLei(pl).then(res => {
      if (!res.error && res.value) {
        //works fine
        this.carregarPropostas();
      } else {
        //error
      }
    });
  }

  private like(projetodelei, tipo: string) {
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
          icon: 'close-circle',
          handler: () => {
            this.reprovar(pl);
          }
        },
        {
          text: 'Aprovar',
          icon: 'checkmark-circle',
          handler: () => {
            this.aprovar(pl);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  private doRefresh(refresher) {
    this.projetoDeLeiService.getProjetosDeLeiLikes('tr', this.myID).then(res => {
      refresher.complete();
      if (!res.error) {
        this.pls = res.data;
      }
    });
  }

}
