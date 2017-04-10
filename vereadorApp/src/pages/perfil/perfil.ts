import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Usuario } from '../../model/user';
import { FotoService } from '../../providers/foto-service';
import { StorageService } from '../../providers/storage';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  private editar: boolean = false;
  private usuarioAtual: Usuario = new Usuario();
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private toastCtrl: ToastController,
    public fotoService: FotoService,
    public alertCtrl: AlertController,
    private storageService: StorageService,
    public http: Http
  ) {
    this.carregarConta();

  }


  private carregarConta() {
    this.storageService.get().then(res => {
      this.usuarioAtual = res;
    });
  }
  //exibe toast
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  private editarAction() {
    if (this.editar == false) {
      this.editar = true;
    } else if (this.editar == true) {
      this.editar = false;
      //verificação se dejesa cancelar ou salvar
      let confirm = this.alertCtrl.create({
        title: 'Salvar',
        message: 'Deseja salvar as modificações feitas?',
        buttons: [
          {
            text: 'Descartar',
            handler: () => {
              this.carregarConta();
            }
          },
          {
            text: 'Salvar',
            handler: () => {
              if (this.validacao()) {
                this.mudarPhp().then(res => {
                  if (res.nome != "") {
                    this.storageService.set(res);
                    this.presentToast("Alterado com sucesso");
                  } else {
                    this.presentToast("Não foi possivel alterar");
                  }
                }).catch(() => this.presentToast("Não foi possivel se conectar com o servidor"));
              }
            }
          }]
      });
      confirm.present();
    }
  }

  private validacao(): boolean {
    if (this.usuarioAtual.nome == "" || this.usuarioAtual.telefone == "") {
      return false;
    }
    return true;
  }

  private mudarPhp(): Promise<Usuario> {
    return this.http.post("http://dsoutlet.com.br/apiLuiz/alterarPerfil.php", JSON.stringify(this.usuarioAtual), { headers: this.headers }).toPromise()
      .then(res => res.json()).catch(() => alert("Erro ao tentar se conectar com servidor"));
  }

  private alterarFoto() {
    if (this.editar) {
      let confirm = this.alertCtrl.create({
        subTitle: 'Importar imagem da:',
        buttons: [
          {
            text: 'Galeria',
            handler: () => {
              this.importarFoto();
            }
          },
          {
            text: 'Câmera',
            handler: () => {
              this.tirarFoto();
            }
          }
        ]
      });
      confirm.present();
    }
  }

  private importarFoto() {
    this.fotoService.importarFoto().then(url => {
      if (url !== "false") {
        this.usuarioAtual.fotoURL = url;
      }
    });
  }

  private tirarFoto() {
    this.fotoService.tirarFoto().then(url => {
      if (url !== "false") {
          this.usuarioAtual.fotoURL = url;
      }
    });
  }

}
