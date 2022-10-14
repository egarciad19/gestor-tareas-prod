import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Servicios } from './services/servicios.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { TablerosComponent } from './tableros/tableros.component';
import { MenuComponent } from './menu/menu.component';
import { CrearTableroComponent } from './crear-tablero/crear-tablero.component';
import { LoginComponent } from './login/login.component';
import { LoginInvitadoComponent } from './login-invitado/login-invitado.component';
import { TableroSeleccionadoComponent } from './tablero-seleccionado/tablero-seleccionado.component';
import { TareaSeleccionadaComponent } from './tarea-seleccionada/tarea-seleccionada.component';
import { CrearListaTareaComponent } from './crear-lista-tarea/crear-lista-tarea.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { CrearTareaComponent } from './crear-tarea/crear-tarea.component';
import { EditarTareaComponent } from './editar-tarea/editar-tarea.component';
import { CrearListaActividadComponent } from './crear-lista-actividad/crear-lista-actividad.component';
import { CrearActividadComponent } from './crear-actividad/crear-actividad.component';
import { CrearEtiquetaComponent } from './crear-etiqueta/crear-etiqueta.component';
import { CompartirComponent } from './compartir/compartir.component';

//material
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';


//import { PruebaComponent } from './prueba/prueba.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    TablerosComponent,
    MenuComponent,
    CrearTableroComponent,
    LoginComponent,
    LoginInvitadoComponent,
    TableroSeleccionadoComponent,
    CrearTareaComponent,
    CrearListaTareaComponent,
    TareaSeleccionadaComponent,
    //PruebaComponent,
    RegistroUsuarioComponent,
    EditarTareaComponent,
    CrearListaActividadComponent,
    CrearActividadComponent,
    CrearEtiquetaComponent,
    CompartirComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatDialogModule,
    MatExpansionModule,
    MatTableModule,
    MatCheckboxModule
  ],
  providers: [
    Servicios
  ],
  bootstrap: [AppComponent],
  entryComponents: [CrearTareaComponent]
})
export class AppModule {}
