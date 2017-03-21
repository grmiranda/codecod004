import { Component } from '@angular/core';
import { PlAndamentoPage } from '../pl-andamento/pl-andamento';
import { PlAprovadosPage } from '../pl-aprovados/pl-aprovados';
import { PlPropostasPage } from '../pl-propostas/pl-propostas';
import { PlRecusadosPage } from '../pl-recusados/pl-recusados';

@Component({
  selector: 'page-tab-projetos-de-lei',
  templateUrl: 'tab-projetos-de-lei.html'
})
export class TabProjetosDeLeiPage {

  tab1Root: any = PlAndamentoPage;
  tab2Root: any = PlPropostasPage;
  tab3Root: any = PlAprovadosPage;
  tab4Root: any = PlRecusadosPage;

  constructor() {}

}
