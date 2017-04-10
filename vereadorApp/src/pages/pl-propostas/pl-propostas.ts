import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform, AlertController, LoadingController, ModalController, ToastController } from 'ionic-angular';
import { NovaPropostaPlPage } from '../nova-proposta-pl/nova-proposta-pl';
import { NovaPlPage } from '../nova-pl/nova-pl';
import { ProjetoDeLeiService } from '../../providers/pl-service';
import { StorageService } from '../../providers/storage';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
import { LikeService } from '../../providers/like-service';
import { LikeProjetoDeLei } from '../../model/like-projeto-de-lei';
import { VisualizarPlPage } from '../visualizar-pl/visualizar-pl';
import { FeedBackService } from '../../providers/feed-back-service';
import { Usuario } from '../../model/user';


@Component({
  selector: 'page-pl-propostas',
  templateUrl: 'pl-propostas.html'
})
export class PlPropostasPage {

  private pls: any[] = [];
  private myUser: Usuario;

  constructor(
    public projetoDeLeiService: ProjetoDeLeiService,
    public likeService: LikeService,
    public storage: StorageService,
    public navCtrl: NavController,
    private feedService: FeedBackService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    public platform: Platform
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

    this.projetoDeLeiService.getProjetosDeLeiLikes('ap', (+this.myUser.IDUsuario)).then(res => {
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
    pl.estado = 'cn';
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
    this.likeService.addLikeProjetoDeLei(new LikeProjetoDeLei(tipo, (+this.myUser.IDUsuario), projetodelei.pl.IDPL, projetodelei.pl.IDUsuario)).then(res => {
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
            icon: 'trash',
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
            text: 'Adicionar Projeto de Lei',
            icon: 'logo-buffer',
            handler: () => {
              let modal = this.modalCtrl.create(NovaPlPage, { pl: pl });
              modal.onDidDismiss(data => {
                if (data != undefined) {
                  this.feedService.confirmarVariasPl(data.pl.ids, data.pl.pushs, this, data.pl, null, data.msg);
                }

              });
              modal.present();

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

  private confirmado(pl) {

    if (pl.IDUsuario) {
      pl.estado = 'tr';
      this.projetoDeLeiService.editProjetoDeLei(pl).then(res => {
        if (!res.error && res.value) {
          //works fine
          this.carregarPropostas();
          this.displayToast('Projeto de Lei aceito!');
        } else {
          //error - falha conexao / tentar denovo
          this.showConfirm(pl);
        }
      });
    } else {
      pl.estado = 'tr';
      pl.IDUsuario = this.myUser.IDUsuario;
      this.projetoDeLeiService.addProjetoDeLei(pl).then(res => {
        if (!res.error && res.value) {
          //works fine
          this.carregarPropostas();
          this.displayToast('Projeto de Lei criado!');
        } else {
          //error - falha conexao / tentar denovo
          this.showConfirmPl(pl);
        }
      });
    }
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
    this.projetoDeLeiService.getProjetosDeLeiLikes('ap', (+this.myUser.IDUsuario)).then(res => {
      refresher.complete();
      if (!res.error) {
        this.pls = res.data;
      } else {
        this.tentarNovamente();
      }
    });
  }

  public abrirPL(pl: ProjetoDeLei) {
    this.navCtrl.push(VisualizarPlPage, { pl: pl });
  }

  private showConfirmPl(pl) {
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
            this.confirmado(pl);
          }
        }
      ]
    });
    confirm.present();
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
