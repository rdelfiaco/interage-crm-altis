import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WavesModule, MDBBootstrapModulesPro, ButtonsModule, IconsModule, CheckboxModule, InputsModule } from 'ng-uikit-pro-standard';

import { PausaComponent } from './pausa.component';
import { PausaDoUsuarioComponent } from './pausa-do-usuario/pausa-do-usuario.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    WavesModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    ButtonsModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    IconsModule,
    CheckboxModule,
    InputsModule.forRoot(),
  ],
  
  declarations: [
    PausaComponent,
    PausaDoUsuarioComponent,
    
  ],
  
})
export class PausaModule { }
