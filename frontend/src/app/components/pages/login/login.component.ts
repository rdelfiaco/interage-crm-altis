import { Usuario } from '../../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import SHA1 from 'src/app/shared/services/sha1';
import { LocalStorage } from 'src/app/shared/services/localStorage';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuarioLogado: Usuario = new Usuario();

  loginForm: FormGroup;


  constructor( private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private localStorage: LocalStorage,
    private toastrService: ToastService
     ) { 
    this.loginForm = formBuilder.group({
      login: ['', [ Validators.required ] ],
      senha: ['', [ Validators.required ] ],
    });
  }

  ngAfterViewChecked() {
   //  document.querySelector('.form-content').classList.remove('animation-login');
   document.querySelector('.form-content').classList.add('animation-login');
  }

  ngOnInit(): void {
  }


  async fazerLogin() {
    this.usuarioLogado.login = this.loginForm.value.login;
    this.usuarioLogado.senha = SHA1(this.loginForm.value.senha);
   
    const res = await this.auth.autenticacao(this.usuarioLogado);
    if (res.error) {
      this.toastrService.error(res.error);
      this.loginForm.controls['senha'].setValue('');
      this.router.navigate(['/login']);
    }
    else {
      this.router.navigate(['']);
    }
  }
}
