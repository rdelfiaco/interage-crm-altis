import { element } from 'protractor';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectHTTP } from '../../shared/services/connectHTTP';
import { LocalStorage } from '../../shared/services/localStorage';
import { IMyOptions, ToastService } from 'ng-uikit-pro-standard';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-criar-evento',
  templateUrl: './criar-evento.component.html',
  styleUrls: ['./criar-evento.component.scss']
})
 

export class CriarEventoComponent implements OnInit {
  private _pessoa: any
  public _evento: any
  _idCanal: any
  pessoaId: any

  @Input()
  set pessoa(pessoa: any) {
    
    if (pessoa)
      pessoa.subscribe((pessoa) => {
        this.pessoaId = new Observable((observer) => {
          
          observer.next(pessoa.principal.id)
        })
        this.criarEventoForm.controls['pessoaId'].setValue(pessoa.principal.id);
        this.pessoaId = pessoa.principal.id;
      });

  }
  get pessoa(): any {
    return this._pessoa;
  }
@Input() 
  set atendimento(atendimento : any) {
    if (atendimento){
      this.criarEventoForm.controls['pessoaId'].setValue(atendimento.principal.id);
      this.pessoaId = atendimento.principal.id;
    }
  }
  get atendimento(): any {
    return this._pessoa;
  }

  @Input()
  set evento(evento: any) {
    console.log('evento ', evento )
    this._evento = evento;
    // this.criarEventoForm.controls['canal'].setValue(evento.id_canal);
    // this.criarEventoForm.controls['id_motivo'].setValue(evento.id_motivo);
    this.criarEventoForm.controls['canal'].reset({ value: evento.id_canal , disabled: true});
    this.criarEventoForm.controls['id_motivo'].reset({ value: evento.id_motivo , disabled: true});
    this.disabledCliente = true;

  }
  get evento(): any {
    return this._evento
  }

  @Input() eventoAnterior: any = null;
  @Input() protocolo: any = null;
  @Input() ddd: any = null;
  @Input() telefone: any = null;
  @Input() idEventoPai: any = null;

  @Input() 
  set idPessoaReceptor(idPessoaReceptor: any){ 
    this.pessoaId = idPessoaReceptor;
    this.disabledCliente = true;
    this._evento = false;
    this.criarEventoForm.controls['pessoaId'].setValue(idPessoaReceptor);

  }
  @Input() 
  set idCanal(idCanal: any){
    //this.criarEventoForm.controls['canal'].setValue(idCanal);
    this.criarEventoForm.controls['canal'].reset({ value: idCanal , disabled: true})
    this._idCanal = idCanal;
    this.disabledCliente = true;
  }
  

  @Input() disabled: any;
  @Output() fechaModal: EventEmitter<any> = new EventEmitter();

  motivosDoCanal: Array<any> = [];
  motivosDoCanalSelecionado: Array<any> = [];
  criarEventoForm: FormGroup;
  departamentoSelect: Array<any>;
  canaisSelect: Array<any>;
  usuarioSelect: Array<any>;
  optionsTipoDestino: Array<any>;
  disabledCliente: boolean = false;

  public myDatePickerOptions: IMyOptions = {
    dayLabels: { su: 'Dom', mo: 'Seg', tu: 'Ter', we: 'Qua', th: 'Qui', fr: 'Sex', sa: 'Sab' },
    dayLabelsFull: { su: "Domingo", mo: "Segunda", tu: "Terça", we: "Quarta", th: "Quinta", fr: "Sexta", sa: "Sábado" },
    monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez' },
    monthLabelsFull: { 1: "Janeiro", 2: "Fevereiro", 3: "Março", 4: "Abril", 5: "Maio", 6: "Junho", 7: "Julho", 8: "Agosto", 9: "Setembro", 10: "Outubro", 11: "Novembro", 12: "Dezembro" },

    // Buttons
    todayBtnTxt: "Hoje",
    clearBtnTxt: "Limpar",
    closeBtnTxt: "Fechar",
    closeAfterSelect: true,
    dateFormat: 'dd/mm/yyyy',
  }

  constructor(private formBuilder: FormBuilder, private connectHTTP: ConnectHTTP,
    private localStorage: LocalStorage, private toastrService: ToastService,
    private router: Router) {
    this.criarEventoForm = this.formBuilder.group({
      tipodestino: ['P', [
        Validators.required
      ]],
      pessoaOrgonograma: ['', [
        Validators.required
      ]],
      canal: [{value:'', disabled: false}, [
        Validators.required
      ]],
      id_motivo: [{value:'', disabled: false}, [
        Validators.required
      ]],
      pessoaId: ['', [Validators.required]],
      data: [''],
      hora: [''],
      observacao: [''],
      encerrado:[false]
    })
  }

  async ngOnInit() {
    let eventoEncontrado = await this.connectHTTP.callService({
      service: 'informacoesParaCriarEvento',
      paramsService: {
      }
    }) as any;

    this.departamentoSelect = eventoEncontrado.resposta.organograma;
    this.departamentoSelect = (this.departamentoSelect || [] ).map(departamento => {
      return { value: departamento.id, label: departamento.nome }
    });

    this.canaisSelect = eventoEncontrado.resposta.canais;
    this.canaisSelect = this.canaisSelect.map(canal => {
      return { value: canal.id, label: canal.nome }
    });

    this.usuarioSelect = eventoEncontrado.resposta.usuarios;
    this.usuarioSelect = this.usuarioSelect.filter( element => { return element.status  } ).map(usuario => {
          return { value: usuario.id_pessoa, label: usuario.nome }
    });

    this.motivosDoCanal = eventoEncontrado.resposta.motivosCanais;
    if (this._evento && this._evento.id_canal)
      this.onSelectCanal({ value: this._evento.id_canal });

    if (this._idCanal)
      this.onSelectCanal({ value: this._idCanal });

    this.optionsTipoDestino = this.usuarioSelect;

    let data = new Date();
    let date = moment().format('DD/MM/YYYY');

    this.criarEventoForm.controls['data'].setValue(date);

    let hours = getHora(data);
    this.criarEventoForm.controls['hora'].setValue(hours);
  }

  onSelectTipoPessoa(valor) {
    if (valor.value == 'P')
      this.optionsTipoDestino = this.usuarioSelect;
    else this.optionsTipoDestino = this.departamentoSelect;
  }

  onSelectCanal(valor) {
    this.motivosDoCanalSelecionado = this.motivosDoCanal.filter(m => m.id_canal == valor.value).map(m => {
      return { value: m.id, label: m.nome }
    });

    if (!this.motivosDoCanalSelecionado.length) this.toastrService.error('Canal sem nenhum motivo cadastrado!');
  }

  onSelectCliente(valor) {
    this.criarEventoForm.controls['pessoaId'].setValue(valor.value);
  }

  tipoPessoa: Array<object> = [
    {
      value: 'P',
      label: "Usuário"
    },
    {
      value: 'O',
      label: "Departamento"
    },
  ]

  async criarEvento() {
    
    const usuarioLogado = this.localStorage.getLocalStorage('usuarioLogado') as any;

    this.criarEventoForm.controls['canal'].enable();
    this.criarEventoForm.controls['id_motivo'].enable();

    let dataHora = this.criarEventoForm.value.hora.split(':');
    dataHora[0] = parseInt(dataHora[0]) === 24 ? "00" : dataHora[0];

    let dataExibir = moment(`${this.criarEventoForm.value.data} - ${dataHora[0]}:${dataHora[1]}`, 'DD/MM/YYYY - HH:mm').toISOString()
    
    if (this.evento) {
      await this.connectHTTP.callService({
        service: 'encaminhaEvento',
        paramsService: {
          id_pessoa_resolveu: usuarioLogado.id_pessoa,
          id_evento: this.evento.id,
          id_status_evento: this.evento.id_status_evento,
          id_campanha: this.evento.id_campanha,
          id_motivo: this.criarEventoForm.value.id_motivo,
          id_evento_pai: this.evento.id,
          dt_para_exibir: dataExibir,
          tipoDestino: this.criarEventoForm.value.tipodestino,
          id_pessoa_organograma: this.criarEventoForm.value.pessoaOrgonograma,
          id_pessoa_receptor: this.criarEventoForm.value.pessoaId,
          observacao_origem: this.criarEventoForm.value.observacao,
          id_canal: this.criarEventoForm.value.canal,
        }
      }) as any;
      this.toastrService.success('Evento encaminhado com sucesso!');
      this.fechaModal.emit();
    }
    else {
      let res = await this.connectHTTP.callService({
        service: 'criarEvento',
        paramsService: {
          id_pessoa_resolveu: usuarioLogado.id_pessoa,
          dt_para_exibir: dataExibir,
          id_motivo: this.criarEventoForm.value.id_motivo,
          tipoDestino: this.criarEventoForm.value.tipodestino,
          id_pessoa_organograma: this.criarEventoForm.value.pessoaOrgonograma,
          id_pessoa_receptor: this.criarEventoForm.value.pessoaId,
          observacao_origem: this.criarEventoForm.value.observacao,
          id_canal: this.criarEventoForm.value.canal,
          eventoAnterior: this.eventoAnterior,
          protocolo: this.protocolo,
          ddd: this.ddd,
          telefone: this.telefone,
          encerrado: this.criarEventoForm.value.encerrado,
          eventoPai: this.idEventoPai
        }
      }) as any;
      if (res.error) {
        this.toastrService.error('Error ao criar evento')
      } else {
        this.toastrService.success('Evento criado com sucesso!');
      };
      //this.limpar();
      this.fechaModal.emit();
    }
  }
  cancelar() {
    this.fechaModal.emit();
  }

  limpar() {
    this.criarEventoForm.controls['tipodestino'].setValue('P');
    this.criarEventoForm.controls['pessoaOrgonograma'].setValue('');
    this.criarEventoForm.controls['canal'].setValue('');
    this.criarEventoForm.controls['id_motivo'].setValue('');
    this.criarEventoForm.controls['pessoaId'].setValue('');
    this.criarEventoForm.controls['observacao'].setValue('');
    this.criarEventoForm.controls['encerrado'].setValue(false);

    let data = new Date();
    let date = moment().format('DD/MM/YYYY');

    this.criarEventoForm.controls['data'].setValue(date);

    let hours = getHora(data);
    this.criarEventoForm.controls['hora'].setValue(hours);

    //this._pessoa = null;
    //this._evento = null;

    if (this._evento && this._evento.id_canal)
      this.onSelectCanal({ value: this._evento.id_canal });

    if (this._idCanal)
      this.onSelectCanal({ value: this._idCanal });

  }

  defineDestinatario(){

    const usuarioLogado = this.localStorage.getLocalStorage('usuarioLogado') as any;

    if (this.criarEventoForm.value.encerrado){
      this.criarEventoForm.controls['tipodestino'].setValue('P');
      this.criarEventoForm.controls['pessoaOrgonograma'].setValue( usuarioLogado.id_pessoa );
    }else{
      this.criarEventoForm.controls['tipodestino'].setValue('P');
      this.criarEventoForm.controls['pessoaOrgonograma'].setValue( '' );
    }

  }


}

function getHora(data: Date) {
  let hora = trataTempo(data.getHours() + 0)
  let minutos = trataTempo(data.getMinutes())
  return `${hora}:${minutos}`
}

function trataTempo(tempo: number) {
  if (tempo.toString().length == 1) return `0${tempo}`
  return tempo;
}