import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform, LoadingController, AlertController } from 'ionic-angular';
import { Solicitacao } from '../../model/solicitacao';
import { SolicitacaoService } from '../../providers/solicitacao-service';


@Component({
  selector: 'page-solic-solicitados',
  templateUrl: 'solic-solicitados.html'
})
export class SolicSolicitadosPage {

  private solicitacoes: Solicitacao[] = [];


  constructor(public platform: Platform,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public solicitacaoService: SolicitacaoService,
    public actionSheetCtrl: ActionSheetController) {

  }

  ionViewWillEnter() {
    this.carregarSolicitacoes();
  }

  private carregarSolicitacoes() {

    let loading = this.loadingCtrl.create({
      content: 'Carregando'
    });

    loading.present();

    this.solicitacaoService.getSolicitacoes('sl').then(res => {
      loading.dismiss();
      if (!res.error) {
        this.solicitacoes = res.data;
      } else {
        //error de conexao
        this.tentarNovamente();
      }
    });
  }

  private aprovar(solicitacao: Solicitacao) {
    solicitacao.estado = 'cp';
    this.solicitacaoService.editSolicitacao(solicitacao).then(res => {
      if (!res.error) {
        //removeu
        this.carregarSolicitacoes();
      } else {
        //error
        this.showConfirm(1, solicitacao);
      }
    })
  }

  private reprovar(solicitacao: Solicitacao) {
    solicitacao.estado = 'cn';
    this.solicitacaoService.editSolicitacao(solicitacao).then(res => {
      if (!res.error) {
        //removeu
        this.carregarSolicitacoes();
      } else {
        //error
        this.showConfirm(2, solicitacao);
      }
    })
  }

  private abrirOpcoes(solicitacao: Solicitacao) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Reprovar',
          role: 'destructive',
          icon: 'close-circle',
          handler: () => {
            this.reprovar(solicitacao);
          }
        },
        {
          text: 'Aprovar',
          icon: 'checkmark-circle',
          handler: () => {
            this.aprovar(solicitacao);
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
            this.carregarSolicitacoes();
          }
        }
      ]
    });
    confirm.present();
  }

  private showConfirm(tipo: number, solicitacao: Solicitacao) {
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
              this.aprovar(solicitacao);
            } else if (tipo == 2) {
              this.reprovar(solicitacao);
            }
          }
        }
      ]
    });
    confirm.present();
  }

  private doRefresh(refresher) {
    this.solicitacaoService.getSolicitacoes('sl').then(res => {
      refresher.complete();
      if (!res.error) {
        this.solicitacoes = res.data;
      }
    });
  }
}
