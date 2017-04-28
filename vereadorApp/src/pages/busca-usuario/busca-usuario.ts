import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { BuscaUsuariosService } from '../../providers/busca-usuarios-service';
import { Usuario } from '../../model/user';
import { AbrirUsuarioPage } from '../abrir-usuario/abrir-usuario';

/*
  Generated class for the BuscaUsuario page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-busca-usuario',
  templateUrl: 'busca-usuario.html'
})
export class BuscaUsuarioPage {

  private usuarios: Usuario[] = [];
  private usuariosAux: Usuario[] = [];
  private search: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public buscaService: BuscaUsuariosService,
    private loadingCtrl: LoadingController
  ) {
    this.carregarInformacao();
    
  }

  carregarInformacao(){
    let loading = this.loadingCtrl.create({
      content: 'Carregando'
    });
    loading.present();

    this.buscaService.getUserAll().then(users => {
      this.usuarios = users;
      this.usuariosAux = this.usuarios;
      loading.dismiss();
    }).catch(() => {
      loading.dismiss()
      this.tentarNovamente();
    });
  }

  ionViewWillEnter() {
    this.carregarInformacao();
  }

  initializeItems() {
    this.usuarios = this.usuariosAux;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.usuarios = this.usuarios.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  exibirUsuario(usuario) {
    this.navCtrl.push(AbrirUsuarioPage, { usuario: usuario });
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
            this.carregarInformacao();
          }
        }
      ]
    });
    confirm.present();
  }

}
