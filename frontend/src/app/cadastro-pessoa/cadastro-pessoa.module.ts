import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroPessoaComponent } from './cadastro-pessoa.component';
import { PrincipalComponent } from './principal/principal.component';
import { TelefonesComponent } from './telefones/telefones.component';
import { EnderecosComponent } from './enderecos/enderecos.component';
import { MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import { LinhaDoTempoModule } from '../linha-do-tempo/linha-do-tempo.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../shared/pipes/pipesModule';
import { NetworkingComponent } from './networking/networking.component';
import { PesquisaClienteModule } from './../pesquisa-cliente/pesquisa-cliente.module';
import { MarketingComponent } from './marketing/marketing.component';
import { AuditoriaComponent } from './auditoria/auditoria.component';
import { QuestionariosPessoaComponent } from './questionarios-pessoa/questionarios-pessoa.component';
import { CriarEventoModule } from '../evento/criar-evento/criar-evento.module';
import { PropostaModule } from '../proposta/proposta.module';
import { ServicosContratadosComponent } from './servicos-contratados/servicos-contratados.component';
import { CarregandoModule } from '../shared/carregando/carregando.module';
import { ArquivosComponent } from './arquivos/arquivos.component';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    ToastModule.forRoot(),
    LinhaDoTempoModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    PesquisaClienteModule,
    CriarEventoModule,
    PropostaModule,
    CarregandoModule
    
  ],
  declarations: [
    CadastroPessoaComponent,
    PrincipalComponent,
    TelefonesComponent,
    EnderecosComponent,
    NetworkingComponent,
    MarketingComponent,
    AuditoriaComponent,
    QuestionariosPessoaComponent,
    ServicosContratadosComponent,
    ArquivosComponent,],
  exports: [
    CadastroPessoaComponent,
    PrincipalComponent,
    TelefonesComponent,
    EnderecosComponent,]
})
export class CadastroPessoaModule { }
