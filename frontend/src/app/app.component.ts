import { AuthService } from './components/pages/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

usuarioLogado: Observable<boolean>

  constructor( private authService: AuthService ){
  }

 ngOnInit(){
    this.authService.usarioLogadoEmitter.subscribe(usuarioLogado => 
    { this.usuarioLogado = usuarioLogado})  
 }

}
