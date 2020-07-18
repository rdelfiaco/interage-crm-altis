import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TesteComponent } from './components/pages/teste/teste.component';
import { SemPermissaoComponent } from './components/shared/sem-permissao/sem-permissao.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { HeaderNavComponent } from './components/layout/header-nav/header-nav.component';



const routes: Routes = [
  {
    path: '',
    component: TesteComponent,
    children: [
      {
        path: '',
        component: TesteComponent,
      },
      {
        path: 'semPermissao', component: SemPermissaoComponent
      },
    ]
  },
  {
    path: '',
    component: HeaderNavComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: '',
    component: PageNotFoundComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
