import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManagerComponent } from './manager/manager.component';
import { CampaignEditorComponent } from './campaign-editor/campaign-editor.component';


@NgModule({
  declarations: [ManagerComponent, CampaignEditorComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
