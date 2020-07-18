import { Component, OnInit } from '@angular/core';
import { Usuario } from './login.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './login.service';
import { ToastService } from 'ng-uikit-pro-standard';
import  SHA1  from '../../../shared/services/sha1'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  loginForm: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private toastrService: ToastService
  ){
    this.loginForm = formBuilder.group({
      login: ['', [Validators.required] ],
      senha: ['', [Validators.required] ],
    });
  };

  ngOnInit() {
  }

  async fazerLogin() {

    this.usuario.login = this.loginForm.value.login;
    this.usuario.senha = SHA1(this.loginForm.value.senha);
   
    const res = await this.auth.autenticacao(this.usuario);
    if (res.error) {
      this.toastrService.error(res.error);
      this.loginForm.controls['senha'].setValue('');
      this.router.navigate(['/login']);
    }
    else {

      this.router.navigate(['/']);
    }
  }


}
