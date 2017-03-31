import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform, ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { Solicitacao } from '../../model/solicitacao';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { RequerimentoService } from '../../providers/requerimento-service';
import { RequerimentoPage } from '../requerimento/requerimento';
import { VisualizarSolicitacaoPage } from '../visualizar-solicitacao/visualizar-solicitacao';


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
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    public solicitacaoService: SolicitacaoService,
    public actionSheetCtrl: ActionSheetController,
    private requerimentoService: RequerimentoService
  ) {

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
      } else {
        this.tentarNovamente();
      }
    });
  }

  private abrirRequirimento(solicitacao: Solicitacao) {
    let modal = this.modalCtrl.create(RequerimentoPage, { solicitacao: solicitacao, operacao: "visualizar" });
    modal.onDidDismiss(data => {
      if (data != undefined) {
        if (solicitacao.andamento != data.andamento) {
          solicitacao.andamento = data.andamento;
          this.editSolicitacao(solicitacao, data.requerimento);
        } else {
          this.editRequerimento(data.requerimento);
        }
      }
    });
    modal.present();
  }

  private editSolicitacao(solicitacao: Solicitacao, requerimento): Promise<boolean> {
    return this.solicitacaoService.editSolicitacao(solicitacao).then(altSol => {
      alert(JSON.stringify(altSol));
      if (altSol.value) {
        this.editRequerimento(requerimento);
      }
    });
  }

  private editRequerimento(requerimento) {
    this.requerimentoService.editRequerimento(requerimento).then(resReq => {
      if (resReq.value) {
        this.displayToast("Requisição alterada com sucesso");
      } else {
        this.displayToast("erro ao alterar requisição");        
      }
    });
  }

  private abrirSolicitacao(soli: Solicitacao) {
    this.navCtrl.push(VisualizarSolicitacaoPage, { solicitacao: soli })
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
