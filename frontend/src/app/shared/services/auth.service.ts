import { Usuario } from '../../models/usuario';

import { Injectable, EventEmitter } from '@angular/core';
import { ConnectHTTP } from './connectHTTP';
import { LocalStorage } from './localStorage';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // usuarioLogado: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this._getTokenLogadoLocalStorage());  
  
  usarioLogadoEmitter  = new EventEmitter<boolean>(false);

  private pageChose = new Subject<string>();
  pageChose$ = this.pageChose.asObservable();

  setPageChose(page){
    this.pageChose.next(page)
  }
  getPageChose() {
    return this.pageChose.asObservable();
  }


  
  

  counterEvents: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  
  usuarioLogadoObject: any;
  setInterval: any;
  config: any;

  constructor(private router?: Router, private localStorage?: LocalStorage, private connectHTTP?: ConnectHTTP) {
    let self = this;
    let tm;
    this.initConfig();
    document.addEventListener("mousemove", () => {
      if (tm) clearTimeout(tm);
      tm = setTimeout(() => {
        self.validaAutenticacao();
      }, 1000 * 5)
    });
  }

  async getCounterEvents() {
    return this.counterEvents;
  }

  async initConfig() {
    // ler paramentros de configuração 
    // let config = await this.connectHTTP.callService({
    //   service: 'getConfiguracao',
    //   paramsService: {
    //     nomeConfiguracao: 'tempoDealertaDeEventos'
    //   }
    // }) as any;
    // this.config = config.resposta[0].valor;
    this.config = 30000;
    if (this.usuarioLogadoObject ){
      this.ativaGetEventos(parseInt(this.config));
    }
  }

  async ativaGetEventos(timer: number) {
    let self = this;
    let res = await self.connectHTTP.callService({
      service: 'getCountEventosPendentes',
      paramsService: {
        idUsuarioLogado: self.usuarioLogadoObject.id
      }
    }) as any;
    let counter = res.resposta[0].count as number;
    this.counterEvents.next(counter);
    this.setInterval = setInterval(async () => {

      //      if (!self.usuarioLogadoObject) return clearInterval(self.setInterval);
      if (!this.getUsuarioLogadoLocalStorage() ) return clearInterval(self.setInterval);

      let res = await self.connectHTTP.callService({
        service: 'getCountEventosPendentes',
        paramsService: {
          idUsuarioLogado: self.usuarioLogadoObject.id
        }
      }) as any;
      let counter = res.resposta[0].count as number;
      this.counterEvents.next(counter);
    }, timer)
  }

  estaLogado(): Observable<boolean> {
    // return this.usuarioLogado.asObservable();
    return this.usarioLogadoEmitter
  }

  async autenticacao(usuario: Usuario) {

    try {
      const usuarioLogado = await this.connectHTTP.callService({
        service: 'login',
        naoExigeToken: true,
        paramsService: {
          login: usuario.login,
          senha: usuario.senha
        }
      })
      if (usuarioLogado.error.length > 0 ) {
        this.usuarioLogadoObject = {};  
        return {error: usuarioLogado.error }  
      }
      this.usuarioLogadoObject = usuarioLogado.resposta;
      this.localStorage.postLocalStorage('usuarioLogado', usuarioLogado.resposta)
      this._setValidadeToken();
      this.ativaGetEventos(parseInt(this.config));
      // this.usuarioLogado.next(true)
      this.usarioLogadoEmitter.emit(true)
      return usuarioLogado;
    }
    catch (e) {
      return e;
    }
  }

  checkAutenticacao() {
    if (this.usuarioLogadoObject ) {
        return this._getDataExpiracao() && this._getDataExpiracao().getTime() > new Date().getTime() ;
    }
  }

  validaAutenticacao() {
    if (this.usuarioLogadoObject ) {
        if (this.getUsuarioLogadoLocalStorage()){
        if (this._getDataExpiracao().getTime() > new Date().getTime()) {
          this._setValidadeToken();
        }
        else {
          this.logout();
        }
      }
    }
  }

  _getDataExpiracao(): Date {
    if (this.usuarioLogadoObject && this.usuarioLogadoObject.token)
      return this.localStorage.getLocalStorage(this.usuarioLogadoObject.token as string) as Date;
  }
  _setValidadeToken() {
    let validadeToken = new Date(new Date().getTime() + (1000 * 60 * 30))
    if (this.usuarioLogadoObject && this.usuarioLogadoObject.token)
      this.localStorage.postLocalStorage(this.usuarioLogadoObject.token, validadeToken)
  }

  async logout() {
    let usuarioLogado = this.getUsuarioLogadoLocalStorage();
    if (usuarioLogado) {
      await this.connectHTTP.callService({
        service: 'logout',
        naoExigeToken: true,
        paramsService: {
          token: usuarioLogado.token,
          id_usuario: usuarioLogado.id
        }
      })
    this.localStorage.delLocalStorage('usuarioLogado', 'object')
    this.usarioLogadoEmitter.emit(false)
    }
  }

  getUsuarioLogadoLocalStorage() {
    return this.localStorage.getLocalStorage('usuarioLogado') as Usuario;
  }

  _getTokenLogadoLocalStorage() {
    
    if (!this.usuarioLogadoObject) this.usuarioLogadoObject = this.getUsuarioLogadoLocalStorage();
    if (this.usuarioLogadoObject)
      return this.localStorage.getLocalStorage(this.usuarioLogadoObject.token);
  }
}
