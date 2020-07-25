import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { LocalStorage } from './localStorage';
import { UsuarioLogado } from '../../models/usuario';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private auth: AuthService,
    private localStorage: LocalStorage) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
  
   
   let usuarioLogado = this.localStorage.getLocalStorage('usuarioLogado') as UsuarioLogado;

   if (usuarioLogado != null) {
      if (this.auth.checkAutenticacao()) {
        if (this._checkPermissaoRota(route, usuarioLogado))
          return true;
        else {
          if (route.routeConfig.path == '/login') {
            this.router.navigate(['/login']);
            return true;
          }else {
          this.router.navigate(['/semPermissao']);
          return true;
          }
        }
      }
      else {
        this.auth.logout();
      }
    }
    this.router.navigate(['/login']);
  }

  _checkPermissaoRota(route: ActivatedRouteSnapshot, usuarioLogado: UsuarioLogado) {
      let rotas = [];
      (usuarioLogado.permissoes || []).forEach(elem =>{
          if (elem.rota != null) rotas.push(elem.rota)
      });
      if (rotas.find( element => element == route.routeConfig.path) ) 
        { return true;
        } else {

          return false;
        }
  }
}