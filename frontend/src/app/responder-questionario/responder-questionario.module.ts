import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WavesModule, ButtonsModule, CheckboxModule, InputsModule } from 'ng-uikit-pro-standard';
import { MDBBootstrapModulesPro, IconsModule } from 'ng-uikit-pro-standard';
import { ResponderQuestionarioComponent } from './responder-questionario.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    // WavesModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    ButtonsModule,
    // ReactiveFormsModule,
    // FormsModule,
    IconsModule,
    CheckboxModule,
    InputsModule.forRoot(),
  ],
  declarations: [
    ResponderQuestionarioComponent
  ],
  exports: [ResponderQuestionarioComponent],
  providers: [
  ]
})
export class ResponderQuestionario { }
