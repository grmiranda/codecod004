import { Component } from '@angular/core';
import { NavController, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import { ProjetoDeLeiService } from '../../providers/pl-service';
import { StorageService } from '../../providers/storage';
import { LikeService } from '../../providers/like-service';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
import { NovaPlPage } from '../nova-pl/nova-pl';
import { LikeProjetoDeLei } from '../../model/like-projeto-de-lei';
import { VisualizarPlPage } from '../visualizar-pl/visualizar-pl';

@Component({
  selector: 'page-pl-andamento',
  templateUrl: 'pl-andamento.html'
})
export class PlAndamentoPage {

  private pls: any[] = [];
  private myID;

  constructor(public navCtrl: NavController,
    public likeService: LikeService,
    public projetoDeLeiService: ProjetoDeLeiService,
    private loadingCtrl: LoadingController,
    public storage: StorageService,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController
  ) {

  }

  ionViewWillEnter() {
    this.storage.get().then(res => {
      this.myID = res.IDUsuario;
    this.carregarPropostas();
    });
  }

  private carregarPropostas() {

    let loading = this.loadingCtrl.create({
      content: 'Carregando'
    });

    loading.present();

    this.projetoDeLeiService.getProjetosDeLeiLikes('tr', this.myID).then(res => {
      loading.dismiss();
      if (!res.error) {
        this.pls = res.data;
      }else{
        this.tentarNovamente();
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
        this.showConfirm(1, pl);
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
        this.showConfirm(2, pl);
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
            this.carregarPropostas();
          }
        }
      ]
    });
    confirm.present();
  }

  private showConfirm(tipo: number, pl: ProjetoDeLei) {
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
            if (tipo == 1) {
              this.aprovar(pl);
            } else if (tipo == 2) {
              this.reprovar(pl);
            }
          }
        }
      ]
    });
    confirm.present();
  }

  private doRefresh(refresher) {
    this.projetoDeLeiService.getProjetosDeLeiLikes('tr', this.myID).then(res => {
      refresher.complete();
      if (!res.error) {
        this.pls = res.data;
      }else{
        this.tentarNovamente();
      }
    });
  }

  public abrirPL(pl: ProjetoDeLei){
    this.navCtrl.push(VisualizarPlPage, {pl: pl});
  }

}
