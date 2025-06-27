import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { UsersComponent } from './pages/users/users.component';
import { AdminGuard } from '../../core/guards/admin.guard';
import { ProfileComponent } from '../profile/pages/profile/profile.component';
import { EditProfileComponent } from '../profile/pages/edit-profile/edit-profile.component';
import { UnauthorizedComponent } from '../../shared/errors/unauthorized.component';


const routes: Routes = [
  { 
    path: 'users', 
    component: UsersComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },
  {
    path: 'users/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'users/:id/edit',
    component: EditProfileComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
