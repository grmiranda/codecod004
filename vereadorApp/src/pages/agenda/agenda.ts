import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, ToastController, ModalController, AlertController } from 'ionic-angular';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { MonthViewComponent } from 'ionic2-calendar/monthview';
import { WeekViewComponent } from 'ionic2-calendar/weekview';
import { DayViewComponent } from 'ionic2-calendar/dayview';
import { NgCalendarModule } from 'ionic2-calendar';
import { AdicionarEventoPage } from '../adicionar-evento/adicionar-evento';
import { EventoService } from '../../providers/evento-service';
import { EventoPage } from '../evento/evento';

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


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public calendarMd: NgCalendarModule,
    public loadingController: LoadingController,
    private alertCtrl: AlertController,
    private eventoService: EventoService,
    private toastCtrl: ToastController
  ) {
    this.calendar = {
      mode: 'month',
      currentDate: new Date()
    };
  }

  ionViewWillEnter() {
    this.getEventos();
  }

  // funções do calendario
  onCurrentDateChanged(event: Date) {
    this.calendar.currentDate = event;
  }

  reloadSource(startTime, endTime) {

  }

  onEventSelected(event) { // evento diparado quando um evendo é selecionado na lista
    this.navCtrl.push(EventoPage, { evento: event });
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


    let loader = this.loadingController.create({
      content: "Carregando"
    });

    loader.present();

    this.eventoService.getEventos().then(res => {
      loader.dismiss();

      if (res) {
        this.eventos = res;

        this.eventSource = [];

        for (let i = 0; i < this.eventos.length; i++) {
          this.eventSource.push({
            id: this.eventos[i].IDEvento,
            title: this.eventos[i].Titulo,
            startTime: new Date(this.eventos[i].DataInicio),
            endTime: new Date(this.eventos[i].DataTermino),
            allDay: this.eventos[i].EventoDiario,
            descricao: this.eventos[i].Descricao,
            local: this.eventos[i].Local,
            IDUsuario: this.eventos[i].IDUsuario
          });
        }
      } else {
        this.tentarNovamente();
      }
    });
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
            this.getEventos();
          }
        }
      ]
    });
    confirm.present();
  }

  private adicionar() {
    let modal = this.modalCtrl.create(AdicionarEventoPage, { dataAtual: this.dataAtual });
    modal.onDidDismiss(data => {
      if (data != null && data != undefined) {
        this.getEventos();
      }
    });
    modal.present();
  }
}
