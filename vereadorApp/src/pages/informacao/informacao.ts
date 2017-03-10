import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Questoes } from '../../model/Questoes';

/*
  Generated class for the Informacao page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-informacao',
  templateUrl: 'informacao.html'
})
export class InformacaoPage {

  private link: string = "http://dsoutlet.com.br/apiLuiz/getInformacoes.php?info";
  private questoes: Questoes[];
  private questaoEscolhida = new Questoes();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: Http
    ) {
      
      this.http.get(this.link).toPromise().then(res=>{
        this.questoes = res.json();
      }).catch(()=>alert("Erro ao se comunicar com o servidor"));
      
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformacaoPage');
  }

  escolherPergunta(pergunta){
    if(this.questaoEscolhida == pergunta){
      this.questaoEscolhida = new Questoes();
    } else{
      this.questaoEscolhida = pergunta;
    }
  }


}
