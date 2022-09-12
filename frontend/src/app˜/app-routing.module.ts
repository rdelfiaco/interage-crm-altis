import { NavComponent } from './components/layout/nav/nav.component';
import { TesteComponent } from './components/pages/teste/teste.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { CanaisComponent } from './components/pages/canais/canais.component';
import { AuthGuardService } from './shared/services/guards/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [ 
      {   
        path:  'teste',
        component: TesteComponent
      },

    ]
    },      
    {   
      path:  'login',
      component: LoginComponent
    },
    {
      path: 'canais',
      component: CanaisComponent,
      canActivate: [AuthGuardService]
    },

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
