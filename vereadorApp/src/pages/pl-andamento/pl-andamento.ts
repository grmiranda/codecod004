import { Component } from '@angular/core';
import { NavController, ActionSheetController, AlertController, LoadingController, ToastController, Platform } from 'ionic-angular';
import { ProjetoDeLeiService } from '../../providers/pl-service';
import { StorageService } from '../../providers/storage';
import { LikeService } from '../../providers/like-service';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
import { NovaPlPage } from '../nova-pl/nova-pl';
import { LikeProjetoDeLei } from '../../model/like-projeto-de-lei';
import { VisualizarPlPage } from '../visualizar-pl/visualizar-pl';
import { FeedBackService } from '../../providers/feed-back-service';
import { Usuario } from '../../model/user';

@Component({
  selector: 'page-pl-andamento',
  templateUrl: 'pl-andamento.html'
})
export class PlAndamentoPage {

  private pls: any[] = [];
  private myUser: Usuario = new Usuario();

  constructor(
    public navCtrl: NavController,
    public likeService: LikeService,
    public projetoDeLeiService: ProjetoDeLeiService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public platform: Platform,
    public storage: StorageService,
    private feedService: FeedBackService,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController
  ) {

  }

  ionViewWillEnter() {
    this.storage.get().then(res => {
      this.myUser = res;
      this.carregarPropostas();
    });
  }

  private carregarPropostas() {

    let loading = this.loadingCtrl.create({
      content: 'Carregando'
    });

    loading.present();

    this.projetoDeLeiService.getProjetosDeLeiLikes('tr', (+this.myUser.IDUsuario)).then(res => {
      loading.dismiss();
      if (!res.error) {
        this.pls = res.data;
        console.log(this.pls);
      } else {
        this.tentarNovamente();
      }
    });
  }

  private novoPL() {
    this.navCtrl.push(NovaPlPage);
  }

  private confirmado(pl: ProjetoDeLei) {
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
    this.likeService.addLikeProjetoDeLei(new LikeProjetoDeLei(tipo, this.myUser.IDUsuario, projetodelei.pl.IDPL, projetodelei.pl.IDUsuario)).then(res => {
      projetodelei.p = res.value.p;
      projetodelei.n = res.value.n;
    });
  }

  private abrirOpcoes(pl: ProjetoDeLei) {
    if (this.myUser.permissao == 1) {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Opções',
        buttons: [
          {
            text: 'Reprovar',
            role: 'destructive',
            icon: !this.platform.is('ios') ? 'close-circle' : null,
            handler: () => {
              this.alertCtrl.create({
                title: 'Reprovar projeto de lei',
                message: "Digite mensagem para usuario",
                inputs: [
                  {
                    name: 'mensagem',
                    placeholder: 'Digite aqui'
                  },
                ],
                buttons: [
                  {
                    text: 'Cancel',
                    handler: data => {
                    }
                  },
                  {
                    text: 'Enviar',
                    handler: data => {
                      this.feedService.reprovarVarios(pl.ids, pl.pushs, this, pl, data.mensagem);
                    }
                  }]
              }).present();
            }
          },
          {
            text: 'Aprovar',
            icon: 'checkmark-circle',
            handler: () => {
              this.alertCtrl.create({
                title: 'Aprovar projeto de lei',
                message: "Digite mensagem para usuario",
                inputs: [
                  {
                    name: 'mensagem',
                    placeholder: 'Digite aqui'
                  },
                ],
                buttons: [
                  {
                    text: 'Cancel',
                    handler: data => {
                    }
                  },
                  {
                    text: 'Enviar',
                    handler: data => {
                      this.feedService.confirmarVariasPl(pl.ids, pl.pushs, this, pl, null, data.mensagem);
                    }
                  }]
              }).present();

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
              this.confirmado(pl);
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
    this.projetoDeLeiService.getProjetosDeLeiLikes('tr', (+this.myUser.IDUsuario)).then(res => {
      refresher.complete();
      if (!res.error) {
        this.pls = res.data;
      } else {
        this.tentarNovamente();
      }
    });
  }

  public abrirPL(pl) {
    this.navCtrl.push(VisualizarPlPage, { pl: pl });
  }

  private displayToast(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
