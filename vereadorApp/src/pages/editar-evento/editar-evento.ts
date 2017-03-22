import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { EventoService } from '../../providers/evento-service';
import { Evento } from '../../model/evento';

/*
  Generated class for the EditarEvento page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-editar-evento',
  templateUrl: 'editar-evento.html'
})
export class EditarEventoPage {

  private evento: any;
  private dataInicio;
  private dataFim;
  private title;
  private local;
  private descricao;
  private horaInicio;
  private horaTermino;
  private allDay: boolean = false;

  constructor(
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private eventoService: EventoService,
    public view: ViewController
  ) {
    this.evento = this.navParams.get("evento");
    this.dataInicio = this.navParams.get("dataInicio");
    this.title = this.evento.title;
    this.descricao = this.evento.descricao;
    this.local = this.evento.local;
    this.allDay = this.evento.allDay;
    this.dataFim = this.navParams.get("dataFim");
    this.horaInicio = this.navParams.get("horaInicio");
    this.horaTermino = this.navParams.get("horaFim");
    console.log(this.allDay);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarEventoPage');
  }

  public finalizar() {
    let evento = new Evento();
    evento.Allday = this.allDay;
    evento.IDEvento = this.evento.id;
    evento.DataInicio = this.dataInicio + " " + this.horaInicio + ":00";
    evento.DataFim = this.dataFim + " " + this.horaTermino + ":00";
    evento.Titulo = this.title;
    evento.Descricao = this.descricao;
    evento.Local = this.local;
    evento.IDUsuario = this.evento.IDUsuario;
    if (this.validate(evento)) {
      console.log(evento);
      this.eventoService.editEvento(evento).then(res => {
        if (res == true) {
          this.evento.title = evento.Titulo;
          this.evento.descricao = evento.Descricao;
          this.evento.local = evento.Local;
          this.evento.allDay = evento.Allday;
          this.view.dismiss({evento: this.evento, dataInicio: this.dataInicio, dataFim: this.dataFim, horaInicio: this.horaInicio, horaFim: this.horaTermino, allDay: this.allDay});
          this.presentToast("Alterado com sucesso");
        }
      });
    }


  }

  validate(evento): boolean {
    if (evento.Titulo == "") {
      this.presentToast("Coloque o titulo do evento");
      return false;
    } else if (evento.Descricao == "") {
      this.presentToast("Faça uma breve descrição do evento");
      return false;
    } else if (evento.DataInicio > this.evento.DataFim) {
      this.presentToast("Data de termino está errada");
      return false;
    } else if (!evento.Allday) {
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
    } else if (evento.Allday) {
      this.horaInicio = "00:00";
      this.horaTermino = "23:59";
    }
    evento.DataInicio = this.dataInicio + " " + this.horaInicio + ":00";
    evento.DataFim = this.dataFim + " " + this.horaTermino + ":00";
    return true;
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  cancel() {
    this.view.dismiss()
  }

}
