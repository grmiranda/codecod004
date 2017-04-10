import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { TelefonesPage } from '../telefones/telefones';
import { Http } from '@angular/http';
import { Categorias } from '../../model/categoriasTelefone';
import { CallNumber } from 'ionic-native';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html'
})
export class CategoriasPage {
  private link: string = "http://dsoutlet.com.br/apiLuiz/telefone.php?telefones";
  private categorias: Categorias[] = [];
  private todosTelefones = [];
  private auxTelefones = [];
  private search: string = "";

  constructor(
    private alertCtrl: AlertController,
    public loadingController: LoadingController,
    private menuCtrl: MenuController,
    public navCtrl: NavController,
    private http: Http) {
    this.carregarItens();
  }

  private carregarItens() {


    let loader = this.loadingController.create({
      content: "Carregando eventos"
    });

    loader.present();

    this.http.get(this.link).toPromise().then(res => {
      this.categorias = res.json();
      this.quicksort(this.categorias, 0, this.categorias.length - 1);
      for (let i = 0; i < this.categorias.length; i++) {
        this.quicksort(this.categorias[i].instituicao, 0, this.categorias[i].instituicao.length - 1);
        this.todosTelefones = this.todosTelefones.concat(this.categorias[i].instituicao);
      }
      this.quicksort(this.todosTelefones, 0, this.todosTelefones.length - 1);
      this.auxTelefones = this.todosTelefones;
      loader.dismiss();
    }).catch(() => {
      loader.dismiss();
      this.tentarNovamente();
    });

    this.initializeItems();
  }

  private initializeItems() {
    this.todosTelefones = this.auxTelefones;
  }

  private getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.todosTelefones = this.todosTelefones.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  private selecionar(categoria: Categorias) {
    this.navCtrl.push(TelefonesPage, { categoria: categoria });
  }

  private quicksort(elements, inicio, fim) {
    //Verifica se o inteiro inicio é menor que o inteiro fim
    if (inicio < fim) {
      //Ocorre a chamada do método particiona e a chamada
      //recursiva do método quickSort, recebendo diferentes parâmetros
      let pivo = this.particiona(elements, inicio, fim);
      this.quicksort(elements, inicio, pivo - 1);
      this.quicksort(elements, pivo + 1, fim);
    }
  }

  //Este ocorre o particionamento virtual do vetor
  private particiona(elements, inicio, fim) {

    let pivo = elements[fim];
    let i = inicio;

    for (let j = inicio; j <= fim - 1; j++) {
      //Verifica se cada elemento é menor do que o pivo
      if (elements[j].nome < pivo.nome) {
        //Aqui realiza o swap (atualização dinâmica dos elementos)
        let aux = elements[i];
        elements[i] = elements[j];
        elements[j] = aux;
        i += 1;
      }
    }

    let aux = elements[i];
    elements[i] = elements[fim];
    elements[fim] = aux;

    return i;
  }

  private ligar(telefoneInstituicao: string) {
    let numero = telefoneInstituicao.replace("(", "");
    numero = numero.replace(")", "");
    numero = numero.replace(" ", "");
    numero = numero.replace("-", "");
    CallNumber.callNumber(numero, true);
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
            this.carregarItens();
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
