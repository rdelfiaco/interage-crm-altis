import { ReportPDF } from './services/reportPDF';
import { BancoDados } from './services/bancoDados';
import { Valida } from './services/valida';
import { ConnectHTTP } from './services/connectHTTP';
import { LocalStorage } from './services/localStorage';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckPermissaoRecurso } from './services/checkPemissaoRecurso';
import { RandomColor } from './services/randomColor';
import { Meses } from './services/meses';
 
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  exports: [
    
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
