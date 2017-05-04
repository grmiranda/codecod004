import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { EditarEventoPage } from '../editar-evento/editar-evento';
import { EventoService } from '../../providers/evento-service';
import { StorageService } from '../../providers/storage';


@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html'
})
export class EventoPage {

  private evento: any;
  private dataInicio;
  private dataFim;
  private horaInicio;
  private horaTermino;
  private permissao = 0;
  private desabilitar: boolean = false;

  constructor(
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private eventoService: EventoService,
    public modalCtrl: ModalController,
    private storageService: StorageService
  ) {
    this.storageService.get().then(resposta=> this.permissao = resposta.permissao);
    this.evento = this.navParams.get("evento");
    
    //format datatime
    this.dataInicio = this.converterDataParaTexto(this.evento.startTime);

    //format datatime
    this.dataFim = this.converterDataParaTexto(this.evento.endTime);

    let horaCerta = this.evento.startTime.toTimeString();
    this.horaInicio = horaCerta.substring(0, 5);

    horaCerta = this.evento.endTime.toTimeString();
    this.horaTermino = horaCerta.substring(0, 5);

    if (this.horaTermino == "23:59" && this.horaInicio == "00:00") {
      this.evento.allDay = true;
    }

  }

  private editar() {
    let modal = this.modalCtrl.create(EditarEventoPage, { evento: this.evento, dataInicio: this.dataInicio, dataFim: this.dataFim, horaInicio: this.horaInicio, horaFim: this.horaTermino });
    modal.onDidDismiss(data => {
      if (data != undefined) {
        this.evento = data.evento;
        this.dataInicio = data.dataInicio;
        this.dataFim = data.dataFim;
        this.horaInicio = data.horaInicio;
        this.horaTermino = data.horaFim;
      }
    });
    modal.present();
  }

  private excluir() {
    this.desabilitar = true;
    this.eventoService.removeEvento(this.evento.id).then(res => {
      if (res == true) {
        this.presentToast("Excluido com sucesso");
        this.navCtrl.pop();
      } else {
        this.presentToast("Erro ao excluir");
      }
    }).catch(()=>this.desabilitar = false);
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  private converterDataParaTexto(data):string{

    let dataCerta = `${data.getFullYear()}`
    if(data.getMonth() + 1 < 10){
      dataCerta += `-0${data.getMonth() + 1}`;
    } else {
      dataCerta += `-${data.getMonth() + 1}`;
    }

    if(data.getDate() < 10 ){
      dataCerta += `-0${data.getDate()}`;
    } else {
      dataCerta += `-${data.getDate()}`;
    }

    return dataCerta;
  }
}
