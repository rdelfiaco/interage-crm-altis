import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

usuarioLogado: boolean

  constructor( private authService: AuthService ){
  }

 ngOnInit(){
   debugger
    this.authService.usarioLogadoEmitter.subscribe(usuarioLogado => 
    { this.usuarioLogado = usuarioLogado})  
    
    if (this.authService.checkAutenticacao()) {
      this.usuarioLogado = true 
    }
    
 }




}
