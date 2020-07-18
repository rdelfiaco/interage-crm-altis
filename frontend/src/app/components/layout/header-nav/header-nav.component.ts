import { UsuarioLogado } from '../../../models/usuarioLogado';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ConnectHTTP } from 'src/app/shared/services/connectHTTP';
import { LocalStorage } from 'src/app/shared/services/localStorage';
import { CheckPermissaoRecurso } from 'src/app/shared/services/checkPemissaoRecurso';
import { AuthService } from '../../../shared/services/auth.service';


@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {

  hasLogado: Observable<boolean>;
  usuarioLogado: UsuarioLogado;
  nomeUsuario: string = 'Usuário';
  // TROCA DADOS SERVIDOR TROCAR NUMERO DA VERSÃO
  versaoSistema: string;
  versaoTeste: boolean; 
  counterEvents: number;
  sub: any;


  

  constructor(private router: Router, 
    private auth: AuthService, 
    private connectHTTP: ConnectHTTP,
    private localStorage: LocalStorage,
    private checkPermissaoRecurso: CheckPermissaoRecurso ) {
    this.hasLogado = this.auth.estaLogado();
    this.usuarioLogado = this.localStorage.getLocalStorage('usuarioLogado') as UsuarioLogado;
    this.getCounterEvents();
    this.versaoSistema = 'T.2.1.22';
    this.versaoTeste = true; 

  }

  ngOnInit(): void {
  }

  async getCounterEvents() {
    let self = this;
    let res = await this.auth.getCounterEvents();
    if (!this.sub)
      this.sub = res.subscribe(o => {
        self.counterEvents = o;
      });
  }

  // async logout() {
  //    let usuarioLogado = this.auth.getUsuarioLogadoLocalStorage();
  //   if (!usuarioLogado) return;
  //   await this.connectHTTP.callService({
  //     service: 'logout',
  //     naoExigeToken: true,
  //     paramsService: {
  //       token: usuarioLogado.token,
  //       id_usuario: usuarioLogado.id
  //     }
  //   })
  //   //this.counterEvents.next(0);
  //   this.localStorage.delLocalStorage('usuarioLogado', 'object')
  //   this.router.navigate(['/login']);
  // }

  logout() {

     this.auth.logout() 

  }


  openPage(page: string, event: any) {
    event.preventDefault();
    event.stopPropagation();
    setTimeout(_ => {
      this.router.navigate([page]);
    }, 100);
  }

  abrirCadastroPessoa() {
    window.open(`/pessoas/${this.usuarioLogado.id_pessoa }`, '_blank')
  }

  temPermissao(recurso) {
    return this.checkPermissaoRecurso.usuarioLocadoAcessaRecurso(recurso)

  }



}


