import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
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
  private horaInicio;
  private horaTermino;

  constructor(private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private eventoService: EventoService) {
    this.evento = this.navParams.get("evento");
    this.dataInicio = this.navParams.get("dataInicio");
    this.dataFim = this.navParams.get("dataFim");
    this.horaInicio = this.navParams.get("horaInicio");
    this.horaTermino = this.navParams.get("horaFim");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarEventoPage');
  }

  public finalizar() {
    let evento = new Evento();
    evento.DataInicio = this.evento.DataInicio + " " + this.horaInicio + ":00";
    evento.DataFim = this.evento.DataFim + " " + this.horaTermino + ":00";
    evento.Titulo = this.evento.title;
    evento.Descricao = this.evento.descricao;
    evento.Local = this.evento.Local;
    this.validate(evento);
    this.eventoService.editEvento(evento).then(res=>{
      if(res==true){
        this.navCtrl.pop();
      }
    })
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
    } else if (this.evento.Allday) {
      this.horaInicio = "00:00";
      this.horaTermino = "23:59";
    }
    this.evento.DataInicio = this.evento.DataInicio + " " + this.horaInicio + ":00";
    this.evento.DataFim = this.evento.DataFim + " " + this.horaTermino + ":00";
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

}
