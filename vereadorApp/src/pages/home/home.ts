import { Component } from '@angular/core';
import { NovaPublicacaoPage } from '../nova-publicacao/nova-publicacao';
import { EditarPublicacaoPage } from '../editar-publicacao/editar-publicacao';
import { PublicacaoPage } from '../publicacao/publicacao';
import { NavController, ActionSheetController } from 'ionic-angular';
import { PublicacaoService } from '../../providers/publicacao-service';
import { Publicacao } from '../../model/publicacao';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private publicacoes: Publicacao[] = [];

  constructor(public navCtrl: NavController, 
  private publicacaoService: PublicacaoService, 
  public actionSheetCtrl: ActionSheetController) {

    this.carregarFeed();
  }

  private carregarFeed() {
    this.publicacaoService.getPublicacoes().then(res => {
      if (!res.error) {
        this.publicacoes = res.data;
      } else {
        //ocorreu um error
      }
    });
  }

  private novaPublicacao() {
    this.navCtrl.push(NovaPublicacaoPage);
  }

  private abrirPublicacao(publicacao: any){
    this.navCtrl.push(PublicacaoPage,{publicacao: publicacao});
  }

  abrirOpcoes(publicacao: any) {
   let actionSheet = this.actionSheetCtrl.create({
     title: 'Opções',
     buttons: [
       {
         text: 'Excluir',
         role: 'destructive',
         handler: () => {
           console.log('Destructive clicked');
         }
       },
       {
         text: 'Editar',
         handler: () => {
           this.navCtrl.push(EditarPublicacaoPage,{publicacao: publicacao});
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
 }

}
