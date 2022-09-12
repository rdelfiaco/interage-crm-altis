import { ReportPDF } from './services/reportPDF';
import { BancoDados } from './services/bancoDados';
import { Valida } from './services/valida';
import { ConnectHTTP } from './services/connectHTTP';
import { LocalStorage } from './services/localStorage';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckPermissaoRecurso } from './services/checkPemissaoRecurso';
import { ResponderQuestionario } from '../responder-questionario/responder-questionario.module';
import { RandomColor } from './services/randomColor';
import { Meses } from './services/meses';

@NgModule({
  imports: [
    CommonModule,
    ResponderQuestionario
  ],
  declarations: [
    //LocalStorage, 
    //ConnectHTTP
    // ResponderQuestionarioComponent
  ],
  exports: [
    ResponderQuestionario
  ],
  providers: [
    LocalStorage,
    ConnectHTTP,
    Valida,
    CheckPermissaoRecurso,
    BancoDados,
    RandomColor,
    ReportPDF,
    Meses
  ]
})
export class SharedModule { }
