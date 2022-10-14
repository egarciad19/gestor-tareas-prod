import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { CrearActividadComponent } from '../crear-actividad/crear-actividad.component';
import { CrearListaActividadComponent } from '../crear-lista-actividad/crear-lista-actividad.component';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  crearListaActividad(datosLista:any){
    return this.http.post(environment.BASE_API_ACTIVIDADES + '/lista-actividad', datosLista);
  }

  getListasActividadesByIdTarea(idTarea:number){
    return this.http.get(environment.BASE_API_ACTIVIDADES + '/lista-actividad/byIdTarea/' + `${idTarea}`);
  }
  
  crearActividad(datosActividad:any){
    return this.http.post(environment.BASE_API_ACTIVIDADES + '/actividades', datosActividad);
  }

  editarActividad(datosActividad:any){
    return this.http.put(environment.BASE_API_ACTIVIDADES + '/actividades', datosActividad);
  }

  getActividadById(id:number){
    return this.http.get(environment.BASE_API_ACTIVIDADES + '/actividades/' + `${id}`);
  }

  getActividadesByIdLista(idLista:number){
    return this.http.get(environment.BASE_API_ACTIVIDADES + '/actividades/byIdLista/' + `${idLista}`);
  }

  abrirCrearListaActividad(codigoTarea: number){
    console.log(codigoTarea)
    return this.dialog.open(CrearListaActividadComponent, {
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "10px"},
      data: {idTarea: codigoTarea}
    });
  }

  abrirCrearActividad(codLista: number, nomLista: string){
    return this.dialog.open(CrearActividadComponent, {
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "10px"},
      data: {idLista: codLista, nomList: nomLista}
    });
  }
}
