import { HeaderNavComponent } from './components/layout/header-nav/header-nav.component';


import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';

import {MDBBootstrapModulesPro, 
        MDBSpinningPreloader, 
        AccordionModule, 
        WavesModule, 
        SidenavModule, 
        NavbarModule, 
        InputsModule, 
        IconsModule,
        ToastModule, 
        } from 'ng-uikit-pro-standard';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { TesteComponent } from './components/pages/teste/teste.component';
import { NavComponent } from './components/layout/nav/nav.component';
import { LoginComponent } from './components/pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    FooterComponent,
    PageNotFoundComponent,
    TesteComponent,
    NavComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    MDBBootstrapModulesPro.forRoot(),
    ToastModule.forRoot(),
    AccordionModule,
    WavesModule,
    SidenavModule,
    NavbarModule,
    InputsModule,
    IconsModule,
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),
    
  ],
  providers: [MDBSpinningPreloader],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ],
  
  
})
export class AppModule { }
