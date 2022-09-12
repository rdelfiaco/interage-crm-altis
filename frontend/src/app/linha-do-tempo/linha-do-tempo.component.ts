import { Component, OnInit, Input } from '@angular/core';
import { ConnectHTTP } from '../shared/services/connectHTTP';
import { ToastService } from 'ng-uikit-pro-standard';
import { LocalStorage } from '../shared/services/localStorage';

@Component({
  selector: 'app-linha-do-tempo',
  templateUrl: './linha-do-tempo.component.html',
  styleUrls: ['./linha-do-tempo.component.scss']
})
export class LinhaDoTempoComponent implements OnInit {
  private usuarioLogado: any;
  eventosDaPessoa: any;

  @Input() pessoa: any;
  constructor(private toastrService: ToastService,
    private connectHTTP: ConnectHTTP,
    private localStorage: LocalStorage) {
    this.usuarioLogado = this.localStorage.getLocalStorage('usuarioLogado') as any;
  }

  ngOnInit() {

  }

  async ngOnChanges() {
    if (!this.pessoa) return;

    try {
      let eventosEncontrados = await this.connectHTTP.callService({
        service: 'getEventosLinhaDoTempo',
        paramsService: {
          id_pessoa_receptor: this.pessoa.principal.id
        }
      }) as any;

      this.eventosDaPessoa = eventosEncontrados.resposta; 

      const ordenaEventos = (eventos: Array<any>): Array<any> => {
        if (eventos && eventos.length)
          return eventos.sort((a, b) => {
            if (new Date(a.dt_criou).getTime() > new Date(b.dt_criou).getTime()) return 1;
            else if (new Date(a.dt_criou).getTime() < new Date(b.dt_criou).getTime()) return -1;
            else return 0;
          })
        return eventos;
      }

      const juntaEventosPaiEFilhos = (eventos: Array<any>, idEventoPai: string) => {
        let eventosRetorno = [];
        eventos.forEach(evento => {
          if (!evento.id_evento_pai && !idEventoPai) {
            eventosRetorno.push({
              ...evento,
              dt_prevista_resolucao: new Date(evento.dt_prevista_resolucao),
              dt_resolvido: evento.dt_resolvido ? new Date(evento.dt_resolvido) : evento.dt_resolvido,
              eventosFilho: ordenaEventos(juntaEventosPaiEFilhos(eventos, evento.id))
            })
          }
          else if (idEventoPai === evento.id_evento_pai) {
            eventosRetorno.push({
              ...evento,
              dt_prevista_resolucao: new Date(evento.dt_prevista_resolucao),
              dt_resolvido: evento.dt_resolvido ? new Date(evento.dt_resolvido) : evento.dt_resolvido,
              eventosFilho: ordenaEventos(juntaEventosPaiEFilhos(eventos, evento.id))
            })
          }
          else return;
        });
        return eventosRetorno.length && eventosRetorno || null;
      }

      this.eventosDaPessoa = ordenaEventos(juntaEventosPaiEFilhos(eventosEncontrados.resposta, null));
    }
    catch (e) {
      // não possui eventos
      
    }
  }

}
