import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Evento } from '../../model/evento';
import { EventoService } from '../../providers/evento-service';
import { StorageService } from '../../providers/storage';

/*
  Generated class for the AdicionarEvento page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-adicionar-evento',
  templateUrl: 'adicionar-evento.html'
})
export class AdicionarEventoPage {
  private evento: Evento = new Evento();
  private horaInicio = "";
  private horaTermino = "";


  constructor(
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    private eventoService: EventoService,
    private storageService: StorageService
  ) {
    this.evento.DataInicio = this.navParams.get("dataAtual");
    this.evento.DataFim = this.navParams.get("dataAtual");
    //this.storageService.get().then(res => this.evento.Usuario_IDUsuario = res.IDUsuario);
    this.evento.IDUsuario = "1";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionarEventoPage');
  }

  adicionar() {
    if (this.validate()) {
      this.eventoService.addEvento(this.evento).then(res => {
        if (res.Titulo != undefined && res.Titulo != null) {
          this.presentToast("Evento adicionado com sucesso");
          this.view.dismiss(this.evento);
        } else{
          this.presentToast("Erro ao adicionar evento");
        }
      });
    }
  }

  validate(): boolean {
    if (this.evento.Titulo == "") {
      this.presentToast("Coloque o titulo do evento");
      return false;
    } else if (this.evento.Descricao == "") {
      this.presentToast("Faça uma breve descrição do evento");
      return false;
    } else if (this.evento.DataInicio > this.evento.DataFim) {
      this.presentToast("Data de termino está errada");
      return false;
    } else if (!this.evento.EventoDiario) {
      if (this.horaInicio == "") {
        this.presentToast("Coloque a hora de inicio do evento");
        return false;
      } else if (this.horaTermino == "") {
        this.presentToast("Coloque a hora de término do evento");
        return false;
      } else if (this.horaInicio > this.horaTermino) {
        this.presentToast("Hora de término está errada evento");
        return false;
      }
    } else if (this.evento.EventoDiario) {
      this.horaInicio = "00:00";
      this.horaTermino = "23:59";
    }
    this.evento.DataInicio = this.evento.DataInicio + " " + this.horaInicio + ":00";
    this.evento.DataFim = this.evento.DataFim + " " + this.horaTermino + ":00";
    return true;
  }

  cancel() {
    this.view.dismiss()
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
