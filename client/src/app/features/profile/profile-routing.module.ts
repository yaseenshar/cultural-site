import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { AdminGuard } from '../../core/guards/admin.guard';
import { UnauthorizedComponent } from '../../shared/errors/unauthorized.component';


const routes: Routes = [
  { path: '', 
    component: ProfileComponent, 
    canActivate: [AuthGuard] 
  },
  { path: 'edit', 
    component: EditProfileComponent, 
    canActivate: [AuthGuard] 
  },
  /* {
    path: 'admin/users/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/users/:id/edit',
    component: EditProfileComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
