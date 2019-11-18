import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonationListComponent } from './donors/donation-list/donation-list.component';
import { AuthGuard } from './core/auth/auth.guard';
import { DonationFormComponent } from './donors/donation-form/donation-form.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './admin/admin.guard';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'donation-list', component: DonationListComponent, canActivate: [AuthGuard] },
  { path: 'donation', component: DonationFormComponent, canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canLoad: [AdminGuard] },
  { path: '', redirectTo: '/donation-list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
