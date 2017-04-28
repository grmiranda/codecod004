import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from '../../model/user';
import { OpcoesUsuarioService } from '../../providers/opcoes-usuario-service';

/*
  Generated class for the AbrirUsuario page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-abrir-usuario',
  templateUrl: 'abrir-usuario.html'
})
export class AbrirUsuarioPage {

  private desabilitar: boolean = false;
  private usuario: Usuario = new Usuario();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private opcoesUsuarioService: OpcoesUsuarioService
  ) {
    this.usuario = this.navParams.get('usuario');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AbrirUsuarioPage');
  }

  nomePermisao(): string {
    if (this.usuario.permissao.toString() == 'Comum') {
      return "Administrar";
    } else {
      return "Comum";
    }
  }

  nomeConta(): string {
    if (this.usuario.banido == 'Ativa') {
      return "Banir";
    } else {
      return "Ativar";
    }
  }

  corP() {
    if (this.usuario.permissao.toString() == 'Comum') {
      return "secondary";
    } else {
      return "danger";
    }
  }

  corC() {
    if (this.usuario.banido == 'Banida') {
      return "secondary";
    } else {
      return "danger";
    }
  }

  conta() {
    this.opcoesUsuarioService.banimento(this.usuario.IDUsuario).then(resposta => {
      if(resposta){
        this.usuario = resposta;
        this.displayToast("Alteração feita com sucesso");
      }else{
        this.displayToast("Erro ao fazer alteração");                
      }
    });
  }

  permisao() {
    this.opcoesUsuarioService.permissao(this.usuario.IDUsuario).then(resposta => {
      if(resposta){
        this.usuario = resposta;
        this.displayToast("Alteração feita com sucesso");        
      } else{
        this.displayToast("Erro ao fazer alteração");        
      }
    });
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
