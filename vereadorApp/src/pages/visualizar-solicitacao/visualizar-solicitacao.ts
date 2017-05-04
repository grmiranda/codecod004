import { Component } from '@angular/core';
import { NavParams, PopoverController, LoadingController, ToastController, ModalController, AlertController, NavController } from 'ionic-angular';
import { Solicitacao } from '../../model/solicitacao';
import { CompartilharPage } from '../compartilhar/compartilhar';
import { LikeSolicitacao } from '../../model/like-solicitacao';
import { SolicitacaoService } from '../../providers/solicitacao-service';
import { FeedBackService } from '../../providers/feed-back-service';
import { RequerimentoService } from '../../providers/requerimento-service';
import { RequerimentoPage } from '../requerimento/requerimento';
import { Requerimento } from '../../model/requerimento';
import { StorageService } from '../../providers/storage';
import { EditarSolicitacaoPage } from '../editar-solicitacao/editar-solicitacao';
import { LikeService } from '../../providers/like-service';

@Component({
  selector: 'page-visualizar-solicitacao',
  templateUrl: 'visualizar-solicitacao.html'
})
export class VisualizarSolicitacaoPage {

  private solicitacao: Solicitacao = new Solicitacao();
  private loading;
  private permissao = 0;
  private idUsuario: any = 0;
  private tipo: any = 'n';
  private apoio: any = 0;
  private reprovacao: any = 0;

  constructor(
    public navParams: NavParams,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public requerimentoService: RequerimentoService,
    public loadingCtrl: LoadingController,
    private solicitacaoService: SolicitacaoService,
    private toastCtrl: ToastController,
    private feedService: FeedBackService,
    private likeService: LikeService,
    storageService: StorageService
  ) {
    this.solicitacao = navParams.get('solicitacao');
    if (this.solicitacao.titulo == "") {
      let loading = this.loadingCtrl.create({
        content: 'Carregando'
      });
      loading.present();
      this.solicitacaoService.getSolicitacaoId(this.solicitacao.IDSolicitacao).then(res => {
        loading.dismiss();
        this.solicitacao = res.data;
      }).catch(() => loading.dismiss());
    }
    storageService.get().then(resp => {
      this.permissao = resp.permissao;
      this.idUsuario = resp.IDUsuario;
      this.likeService.getLikeSolicitacaoByID(this.idUsuario, this.solicitacao.IDSolicitacao).then(res => {
        if (!res.error) {
          this.tipo = res.value.t;
          this.apoio = res.value.p;
          this.reprovacao = res.value.n;
        }
      });
    });

  }

  compartilhar() {
    let popover = this.popoverCtrl.create(CompartilharPage, { titulo: this.solicitacao.titulo, subtitulo: this.solicitacao.descricao, foto: this.solicitacao.fotoURL[0], tipo: "solicitacao", id: this.solicitacao.IDSolicitacao });
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

  requerimento() {
    let modal = this.modalCtrl.create(RequerimentoPage, { operacao: "novo" });
    modal.onDidDismiss(data => {
      let requerimento = new Requerimento();
      if (data != null && data != undefined) {
        this.loading = this.loadingCtrl.create({
          content: 'Carregando'
        });
        this.loading.present();
        requerimento = data.requerimento;
        this.solicitacao.andamento = data.andamento;
        requerimento.IDSolicitacao = this.solicitacao.IDSolicitacao;
        requerimento.idUsuarioSolicitacao = this.solicitacao.IDUsuario;
        let msg = data.msg;

        this.feedService.confirmarVariosRequerimento(this.solicitacao.ids, this.solicitacao.pushs, this, this.solicitacao, requerimento, msg);
      }
    });
    modal.present();
  }

  private confirmado(solicitacao, requerimento) {
    this.requerimentoService.addRequerimento(requerimento).then(respostaRequerimento => {
      if (respostaRequerimento.value == true) {
        this.displayToast("requerimento feito com sucesso");
        solicitacao.estado = "sl";
        this.solicitacaoService.editSolicitacao(solicitacao).then(res => {
          if (!res.error) {
            this.navCtrl.pop();
          } else {
            this.displayToast("Erro ao enviar proposta");
          }
        });
      }
      this.loading.dismiss();
    }).catch(() => this.loading.dismiss());
  }

  private reprovar(solicitacao: Solicitacao) {
    this.solicitacaoService.delSolicitacao(solicitacao).then(res => {
      if (!res.error) {
        this.displayToast("Negação feita com sucesso");
        this.navCtrl.pop();
      } else {
        this.displayToast("Erro ao negar proposta");
      }
      this.loading.dismiss();
    }).catch(() => this.loading.dismiss());
  }


  private displayToast(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  editar() {
    let profileModal = this.modalCtrl.create(EditarSolicitacaoPage, { solicitacao: this.solicitacao });
    profileModal.onDidDismiss((solicitacaoAtualizada) => {
      if (solicitacaoAtualizada) {
        this.solicitacaoService.editSolicitacao(solicitacaoAtualizada).then(res => {
          this.navCtrl.pop();
          let solicitacao = new Solicitacao();
          solicitacao.IDSolicitacao = solicitacaoAtualizada.IDSolicitacao;
          this.navCtrl.push(VisualizarSolicitacaoPage, { solicitacao: solicitacao })
        });
      }
    });
    profileModal.present();
  }

  excluir() {
    this.alertCtrl.create({
      title: 'Motivo de negação',
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
            //envia o feedback para os usuários
            this.feedService.reprovarVarios(this.solicitacao.ids, this.solicitacao.pushs, this, this.solicitacao, data.mensagem);
          }
        }]
    }).present();
  }

  abrirRequerimento() {
    let modal = this.modalCtrl.create(RequerimentoPage, { solicitacao: this.solicitacao, operacao: "visualizar" });
    modal.onDidDismiss(data => {
      if (data != undefined) {
        if (this.solicitacao.andamento != data.andamento) {
          this.solicitacao.andamento = data.andamento;
          this.editSolicitacao(this.solicitacao, data.requerimento);
        } else {
          this.editRequerimento(data.requerimento);
        }
      }
    });
    modal.present();
  }

  private editSolicitacao(solicitacao: Solicitacao, requerimento): Promise<boolean> {
    return this.solicitacaoService.editSolicitacao(solicitacao).then(altSol => {
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

  private like(tipo: string) {
    alert(this.idUsuario);
    if (this.idUsuario != 0 && this.idUsuario != undefined) {
      this.tipo = this.tipo == tipo ? 'u' : tipo;
    this.likeService.addLikeSolicitacao(new LikeSolicitacao(tipo, this.idUsuario, this.solicitacao.IDSolicitacao, this.solicitacao.IDUsuario)).then(res => {
      JSON.stringify(res);
      this.apoio = res.value.p;
      this.reprovar = res.value.n;
    });
    } else {
      this.displayToast("Faça o login no sistema antes para poder dar seu voto");
    }
    
  }

}
