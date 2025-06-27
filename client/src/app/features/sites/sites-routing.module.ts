import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteListComponent } from './pages/site-list/site-list.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { SiteDetailComponent } from './pages/site-detail/site-detail.component';

const routes: Routes = [
  { path: '', component: SiteListComponent, canActivate: [AuthGuard] },
  { path: ':id', component: SiteDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule { }
