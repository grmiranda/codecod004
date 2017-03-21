import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { MonthViewComponent } from 'ionic2-calendar/monthview';
import { WeekViewComponent } from 'ionic2-calendar/weekview';
import { DayViewComponent } from 'ionic2-calendar/dayview';
import { NgCalendarModule } from 'ionic2-calendar';
import { AdicionarEventoPage } from '../adicionar-evento/adicionar-evento';
import { EventoService } from '../../providers/evento-service';

/*
  Generated class for the Agenda page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html'
})
export class AgendaPage {
  private eventos = [];
  private calendar;
  private eventSource = [];
  private isToday: boolean;
  private permissao = "c";
  private dataAtual: string = "";
  private mes: string = 'Dezembro'; //titulo
  data = new Date();
  loader = this.loadingController.create({
    content: "Carregando eventos"
  });

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public calendarMd: NgCalendarModule,
    public loadingController: LoadingController,
    private eventoService: EventoService,
    private toastCtrl: ToastController
  ) {
    this.calendar = {
      mode: 'month',
      currentDate: new Date()
    };
    this.getEventos();
  }

  // funções do calendario
  onCurrentDateChanged(event: Date) {
    this.calendar.currentDate = event;
  }

  reloadSource(startTime, endTime) {

  }

  onEventSelected(event) { // evento diparado quando um evendo é selecionado na lista
    
  }

  onViewTitleChanged = (title: string) => { // atualiza o título
    let data = title.split(' ');
    this.mes = data[0] + ' - ' + data[1];
  };

  onTimeSelected(event) {
    let dataAtual = event.selectedTime.toISOString();
    this.dataAtual = dataAtual.substring(0, 10);
    //console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' + (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  private getEventos() {
    this.eventoService.getEventos().then(res => {

      if (res != false) {
        this.eventos = res;

        this.eventSource = [];

        for (let i = 0; i < this.eventos.length; i++) {

          this.eventSource.push({
            id: this.eventos[i].IDEvento,
            title: this.eventos[i].Titulo,
            startTime: new Date(this.eventos[i].DataInicio),
            endTime: new Date(this.eventos[i].DataTermino),
            allDay: this.eventos[i].EventoDiario
          });
        }
        console.log(this.eventSource);
      }
      else {
        console.log("error");
      }
      this.loader.dismiss();

    });

  }


  adicionar() {
    let modal = this.modalCtrl.create(AdicionarEventoPage, { dataAtual: this.dataAtual });
    modal.onDidDismiss(data => {
        console.log("teste");
      if (data != null && data != undefined) {
        this.getEventos();
      }
    });
    modal.present();
  }
}
