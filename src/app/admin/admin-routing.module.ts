import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerComponent } from './manager/manager.component';
import { CampaignEditorComponent } from './campaign-editor/campaign-editor.component';

// all these routes are prefixed with /admin as specified in app-routing.module.ts
const routes: Routes = [
  { path: 'manager', component: ManagerComponent }, // -> /admin/manager
  { path: 'campaign-editor', component: CampaignEditorComponent }, // -> /admin/campaign-editor
  { path: '', redirectTo: 'manager' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
