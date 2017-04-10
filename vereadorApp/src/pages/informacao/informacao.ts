import { Component } from '@angular/core';
import { LoadingController, AlertController, MenuController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Questoes } from '../../model/Questoes';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-informacao',
  templateUrl: 'informacao.html'
})
export class InformacaoPage {

  private link: string = "http://dsoutlet.com.br/apiLuiz/getInformacoes.php?info";
  private questoes: Questoes[] = [];
  private questaoEscolhida = new Questoes();

  constructor(
    private alertCtrl: AlertController,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    private http: Http
  ) {

    this.carregarInformacoes();
  }

  private carregarInformacoes() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando'
    });
    loading.present();

    this.http.get(this.link).toPromise().then(res => {
      loading.dismiss();
      this.questoes = res.json();
    }).catch(() => {
      loading.dismiss();
      this.tentarNovamente()
    });
  }

  private escolherPergunta(pergunta) {
    if (this.questaoEscolhida == pergunta) {
      this.questaoEscolhida = new Questoes();
    } else {
      this.questaoEscolhida = pergunta;
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
            this.carregarInformacoes();
          }
        }
      ]
    });
    confirm.present();
  }

  private toggleMenu() {
    this.menuCtrl.toggle();
  }

}
