import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ModalDirective, ToastService } from 'ng-uikit-pro-standard';
import { ConnectHTTP } from '../../shared/services/connectHTTP';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BancoDados } from '../../shared/services/bancoDados';

@Component({
  selector: 'app-formulario-evento',
  templateUrl: './formulario-evento.component.html',
  styleUrls: ['./formulario-evento.component.scss']
})
export class FormularioEventoComponent implements OnInit {

  
    placa: any;
    marca: any;
    modelo: any;
    ano: any;
  
  @Input() evento: any;
  @ViewChild('pessoaEditando') pessoaEditando: ModalDirective;
  eventoForm: FormGroup;
  pessoa: Observable<object>;
  constructor(private formBuilder: FormBuilder,
    private connectHTTP: ConnectHTTP,
    private toastrService: ToastService, 
    private bancoDados: BancoDados = new BancoDados,
    private router: Router) {
    this.eventoForm = this.formBuilder.group({
      id: [{value:'', disabled: true}],
      status: [{value:'', disabled: true}],
      motivo: [{value:'', disabled: true}],
      campanha: [{value:'', disabled: true}],
      dt_criou: [{value:'', disabled: true}],
      dt_para_exibir: [{value:'', disabled: true}],
      dt_prevista_resolucao: [{value:'', disabled: true}],
      pessoa_criou: [{value:'', disabled: true}],
      destino: [{value:'', disabled: true}],
      cliente: [{value:'', disabled: true}],
      telefone: [{value:'', disabled: true}],
      objecao: [{value:'', disabled: true}],
      predicao: [{value:'', disabled: true}],
      resposta_motivo: [{value:'', disabled: true}],
      pessoa_visualizou: [{value:'', disabled: true}],
      pessoa_resolveu: [{value:'', disabled: true}],
      dt_visualizou: [{value:'', disabled: true}],
      dt_resolvido: [{value:'', disabled: true}],
      observacao_origem: [{value:'', disabled: true}],
      observacao_retorno: [{value:'', disabled: true}],
      id_proposta: [{value:'', disabled: true}],
      placa: [{value:'', disabled: true}]
    });
  }

  ngOnInit() {


  }

  ngOnChanges() {
    this.eventoForm.setValue({
      id: this.evento.id,
      status: this.evento.status,
      motivo: this.evento.motivo,
      campanha: this.evento.campanha,
      dt_criou: this.evento.dt_criou ? moment(this.evento.dt_criou).format('DD/MM/YYYY HH:mm:ss') : this.evento.dt_criou,
      dt_para_exibir: this.evento.dt_para_exibir ? moment(this.evento.dt_para_exibir).format('DD/MM/YYYY HH:mm:ss') : this.evento.dt_para_exibir,
      dt_prevista_resolucao: this.evento.dt_prevista_resolucao ? moment(this.evento.dt_prevista_resolucao).format('DD/MM/YYYY HH:mm:ss') : this.evento.dt_prevista_resolucao,
      pessoa_criou: this.evento.pessoa_criou,
      destino: this.evento.destino,
      cliente: this.evento.cliente,
      telefone: this.evento.telefone,
      objecao: this.evento.objecao,
      resposta_motivo: this.evento.resposta_motivo,
      predicao: this.evento.predicao,
      pessoa_visualizou: this.evento.pessoa_visualizou,
      pessoa_resolveu: this.evento.pessoa_resolveu,
      dt_visualizou: this.evento.dt_visualizou ? moment(this.evento.dt_visualizou).format('DD/MM/YYYY HH:mm:ss') : this.evento.dt_visualizou,
      dt_resolvido: this.evento.dt_resolvido ? moment(this.evento.dt_resolvido).format('DD/MM/YYYY HH:mm:ss') : this.evento.dt_resolvido,
      observacao_origem: this.evento.observacao_origem,
      observacao_retorno: this.evento.observacao_retorno,
      id_proposta: this.evento.id_proposta,
      placa: this.evento.placa,
    });
  }

  abrirCadastroPessoa() {
    return this.router.navigate(['pessoas/'+this.evento.id_pessoa_receptor]);
  }

  abrirProposta() {
    return this.router.navigate(['proposta/'+this.evento.id_proposta]);
  }

  async abrirVeiculo(){

    let resp = await this.bancoDados.lerDados('getVeiculo',{
      placa : this.evento.placa
    }) as any;
    if(!resp || resp.error) 
     {
      this.toastrService.error('Erro ao ler protocolo ');
      return;
    }
    var veiculo = resp.resposta[0];
    this.placa = veiculo.placa; 
    this.marca = veiculo.marca;
    this.modelo = veiculo.modelo;
    this.ano = veiculo.ano_fabricacao;


    return;
  }

  async cadastroPessoa() {

    let pessoaId = this.evento.id_pessoa_receptor;
    let p = await this.connectHTTP.callService({
      service: 'getPessoa',
      paramsService: {
        id_pessoa: pessoaId
      }
    }) as any;
    this.pessoa = new Observable(o => o.next(p.resposta));

    this.pessoaEditando.show()
  }

  async refresh() {
    let pessoaId = this.evento.id_pessoa_receptor;
    let pessoa = await this.connectHTTP.callService({
      service: 'getPessoa',
      paramsService: {
        id_pessoa: pessoaId
      }
    }) as any;
    this.pessoa = new Observable(o => o.next(pessoa.resposta));
  }

}
