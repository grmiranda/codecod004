import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { MonthViewComponent } from 'ionic2-calendar/monthview';
import { WeekViewComponent } from 'ionic2-calendar/weekview';
import { DayViewComponent } from 'ionic2-calendar/dayview';
import { NgCalendarModule  } from 'ionic2-calendar';

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
  private mes: string = 'Dezembro'; //titulo
  data = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams, public calendarMd: NgCalendarModule) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendaPage');
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

  onTimeSelected(ev) {
    //console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' + (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }
}
