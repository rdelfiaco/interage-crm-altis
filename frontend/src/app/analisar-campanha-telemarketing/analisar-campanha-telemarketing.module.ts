import { DetalheDeCampanhaComponent } from './detalhe-de-campanha/detalhe-de-campanha.component';
import { AnalisarCampanhaTelemarketingComponent } from './analisar-campanha-telemarketing.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import { TreeviewModule } from 'ngx-treeview';
import { DropdownTreeviewSelectComponent } from './detalhe-de-campanha/drop-treeview.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MDBBootstrapModulesPro.forRoot(),
    ToastModule.forRoot(),
    TreeviewModule.forRoot(),

  ],
  declarations: [
    AnalisarCampanhaTelemarketingComponent,
    DetalheDeCampanhaComponent,
    DropdownTreeviewSelectComponent
  ],
  exports:[
    
  ]

})
export class AnalisarCampanhaTelemarketingModule { }
