import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { NovaPropostaPlPage } from '../nova-proposta-pl/nova-proposta-pl';
import { NovaPlPage } from '../nova-pl/nova-pl';
import { ProjetoDeLeiService } from '../../providers/pl-service';
import { StorageService } from '../../providers/storage';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
import { LikeService } from '../../providers/like-service';
import { LikeProjetoDeLei } from '../../model/like-projeto-de-lei';
import { VisualizarPlPage } from '../visualizar-pl/visualizar-pl';


@Component({
  selector: 'page-pl-propostas',
  templateUrl: 'pl-propostas.html'
})
export class PlPropostasPage {

  private pls: any[] = [];
  private myID;

  constructor(public projetoDeLeiService: ProjetoDeLeiService,
    public likeService: LikeService,
    public storage: StorageService,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform) {

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

    this.projetoDeLeiService.getProjetosDeLeiLikes('ap', this.myID).then(res => {
      loading.dismiss();
      if (!res.error) {
        this.pls = res.data;
      } else {
        this.tentarNovamente();
      }
    });
  }

  private novaProposta() {
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
        this.showConfirm(pl);
      }
    })
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
          icon: 'trash',
          handler: () => {
            this.reprovar(pl);
          }
        },
        {
          text: 'Adicionar Projeto de Lei',
          icon: 'logo-buffer',
          handler: () => {
            this.navCtrl.push(NovaPlPage, { pl: pl });
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

  private showConfirm(pl: ProjetoDeLei) {
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
            this.reprovar(pl);
          }
        }]
    });
    confirm.present();
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
        }]
    });
    confirm.present();
  }

  private doRefresh(refresher) {
    this.projetoDeLeiService.getProjetosDeLeiLikes('ap', this.myID).then(res => {
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
