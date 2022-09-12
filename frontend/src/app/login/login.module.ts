

import { NgModule } from '@angular/core';

import { Usuario } from './usuario';


import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    MDBBootstrapModulesPro,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
  ],

  providers: [
    Usuario,
    AuthGuard,
    AuthService
  ]
})

export class LoginModule { }
