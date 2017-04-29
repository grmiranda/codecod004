import { Component } from '@angular/core';
import { NavParams, PopoverController, LoadingController, ModalController, AlertController, ToastController, NavController } from 'ionic-angular';
import { ProjetoDeLei } from '../../model/projeto-de-lei';
import { CompartilharPage } from '../compartilhar/compartilhar';
import { ProjetoDeLeiService } from '../../providers/pl-service';
import { StorageService } from '../../providers/storage';
import { FeedBackService } from '../../providers/feed-back-service';
import { NovaPlPage } from '../nova-pl/nova-pl';


@Component({
  selector: 'page-visualizar-pl',
  templateUrl: 'visualizar-pl.html'
})
export class VisualizarPlPage {

  private pl: ProjetoDeLei;
  private permissao = 0;

  constructor(
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    private plService: ProjetoDeLeiService,
    private storageService: StorageService,
    private feedService: FeedBackService,
    private modalCtrl: ModalController,
    public projetoDeLeiService: ProjetoDeLeiService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private navctrl: NavController
  ) {
    this.pl = navParams.get("pl");
    console.log(this.pl);
    if (this.pl.titulo == "") {
      let loading = this.loadingCtrl.create({
        content: 'Carregando'
      });
      loading.present();
      this.plService.plGetId(this.pl.IDPL).then(res => {
        loading.dismiss();
        this.pl = res.data;
        this.storageService.get().then(resposta => this.permissao = resposta.permissao);
      }).catch(() => loading.dismiss());
    } else {
      this.storageService.get().then(resposta => this.permissao = resposta.permissao);
    }
  }

  compartilhar() {
    let popover = this.popoverCtrl.create(CompartilharPage, { titulo: this.pl.titulo, subtitulo: this.pl.ementa, foto: this.pl.fotoURL[0], tipo: "pl", id: this.pl.IDPL });
    let ev = {
      target: {
        getBoundingClientRect: () => {
          return {
            top: '100'
          };
        }
      }
    };
    popover.present({ ev: event });
  }

  adicionarOficio() {
    let modal = this.modalCtrl.create(NovaPlPage, { pl: this.pl });
    modal.onDidDismiss(data => {
      if (data != undefined) {
        this.feedService.confirmarVariasPl(data.pl.ids, data.pl.pushs, this, data.pl, null, data.msg);
      }
    });
    modal.present();
  }

  reprovarPl() {
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
            this.feedService.reprovarVarios(this.pl.ids, this.pl.pushs, this, this.pl, data.mensagem);
          }
        }]
    }).present();

  }

  private reprovar(pl: ProjetoDeLei) {
    pl.estado = 'cn';
    this.projetoDeLeiService.editProjetoDeLei(pl).then(res => {
      if (!res.error) {
        //removeu
        this.navctrl.pop();
      } else {
        //error
        this.showConfirm(pl);
      }
    })
  }

  private confirmado(pl) {
    if (pl.estado == "ap") {
      pl.estado = 'tr';

    } else if (pl.estado == "tr") {
      pl.estado = 'cp';
    }

    this.projetoDeLeiService.editProjetoDeLei(pl).then(res => {
      if (!res.error && res.value) {
        //works fine
        this.navctrl.pop();
        this.displayToast('Projeto de Lei aceito!');
      } else {
        //error - falha conexao / tentar denovo
        this.showConfirm(pl);
      }
    });

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
