import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form/form.component';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/clientes',
    pathMatch: 'full'
  },
  {
    path: 'directivas',
    component: DirectivaComponent
  },
  {
    path: 'clientes',
    component: ClientesComponent
  },
  {
    path: 'clientes/page/:page',
    component: ClientesComponent
  },
  {
    path: 'clientes/form',
    component: FormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 'ROLE_ADMIN'}
  },
  {
    path: 'clientes/form/:id',
    component: FormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 'ROLE_ADMIN'}
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }