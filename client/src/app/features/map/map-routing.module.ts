import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullMapComponent } from './pages/full-map/full-map.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: FullMapComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
