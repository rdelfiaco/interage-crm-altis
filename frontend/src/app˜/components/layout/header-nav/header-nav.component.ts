import { AuthService } from 'src/app/shared/services/auth.service';
import { Usuario } from '../../../models/usuario';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorage } from 'src/app/shared/services/localStorage';


@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {

  @Output() pageChoseEmitter = new EventEmitter();

  hasLogado: Observable<boolean>;
  usuarioLogado: Usuario;
  nomeUsuario: string = 'Usuário';
  // TROCA DADOS SERVIDOR TROCAR NUMERO DA VERSÃO
  versaoSistema: string;
  versaoTeste: boolean; 
  counterEvents: number;
  sub: any;

 // pageChoseEmitter  = new EventEmitter<string>();
  //pageChoseEmitter: BehaviorSubject<string> = new BehaviorSubject<string>('');

  

  constructor(private router: Router, 
    private authService: AuthService, 
    private localStorage: LocalStorage,
     ) {
    this.hasLogado = this.authService.estaLogado();
    this.usuarioLogado = this.localStorage.getLocalStorage('usuarioLogado') as Usuario;
    this.getCounterEvents();
    this.versaoSistema = 'T.2.1.22';
    this.versaoTeste = true; 

  }

  ngOnInit(): void {
    
  }

  async getCounterEvents() {
    let self = this;
    let res = await this.authService.getCounterEvents();
    if (!this.sub)
      this.sub = res.subscribe(o => {
        self.counterEvents = o;
      });
  }


  logout() {

     this.authService.logout() 

  }

  openPage(page: string, event: any) {

    console.log('header-nav ', page )

    this.authService.setPageChose(page)

  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed

    console.log('header-nav - destroy')
    this.authService.setPageChose('')
  }



}


