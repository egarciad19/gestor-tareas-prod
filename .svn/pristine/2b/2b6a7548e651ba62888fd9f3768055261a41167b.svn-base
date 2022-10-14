import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearTableroComponent } from './crear-tablero/crear-tablero.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { LoginInvitadoComponent } from './login-invitado/login-invitado.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { TableroSeleccionadoComponent } from './tablero-seleccionado/tablero-seleccionado.component';
import { TablerosComponent } from './tableros/tableros.component';
import { TareaSeleccionadaComponent } from './tarea-seleccionada/tarea-seleccionada.component';

const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'inicio', component: InicioComponent },
  {path: 'tableros', component: TablerosComponent },
  {path: 'crear-tablero', component: CrearTableroComponent },
  {path: 'login', component: LoginComponent },
  {path: 'invitado', component: LoginInvitadoComponent },
  {path: 'tablero/:id', component: TableroSeleccionadoComponent},
  {path: 'tarea', component: TareaSeleccionadaComponent},
  {path: 'registrarse', component: RegistroUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
