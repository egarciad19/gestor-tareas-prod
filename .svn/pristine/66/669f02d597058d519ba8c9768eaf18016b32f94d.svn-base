import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//import { defaultCipherList } from 'constants';
//import { environment } from 'src/environments/environment.prod';
import { environment } from "src/environments/environment";
import { CrearListaTareaComponent } from '../crear-lista-tarea/crear-lista-tarea.component';
import { CrearTareaComponent } from '../crear-tarea/crear-tarea.component';
import { EditarTareaComponent } from '../editar-tarea/editar-tarea.component';

@Injectable({
  providedIn: 'root'
})
export class TareaService {



  constructor(private http: HttpClient, private dialog: MatDialog) { }


  crearListaTarea(datosLista:any){
    return this.http.post(environment.BASE_API_TABLEROS_TAREAS + '/lista/crea', datosLista); 
  }

  eliminarListaTarea(idListaTarea: number){
    return this.http.delete(environment.BASE_API_TABLEROS_TAREAS + '/lista/' + `${idListaTarea}`)
  }

  getListas(id:number){
    return this.http.get(environment.BASE_API_ACTIVIDADES +'/lista-actividad/'+`${id}`);
  }

  getListasTareas(){
    return this.http.get(environment.BASE_API_TABLEROS_TAREAS + '/lista/obtener/registros');
  }

  getTareasByIdListaTareas(){
    return this.http.get(environment.BASE_API_TABLEROS_TAREAS + '/tarea/obtener/registros');
  }

  obtenerTarea(id:number){
    return this.http.get(environment.BASE_API_TABLEROS_TAREAS +'/tarea/'+`${id}`);
  }

  crearTarea(datosTarea:any){
    return this.http.post(environment.BASE_API_TABLEROS_TAREAS + '/tarea/crea', datosTarea); 
  }

  abrirCrearListaTareaDialog(idTab: number){
    return this.dialog.open(CrearListaTareaComponent, {
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "10px"},
      data: {idTablero: idTab}
    });
  }

  abrirCrearTareaDialog(idLista:number, nombreLista:string){
    return this.dialog.open(CrearTareaComponent, {
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "10px"},
      data: {
        id: idLista,
        nombre: nombreLista
      }
    });
  }
  

  abrirEditarTareaDialog(idTarea:number, nombre:string){
    return this.dialog.open(EditarTareaComponent, {
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "10px"},
      data: {
        id: idTarea,
        nombreTarea: nombre
      }
    });
  }

  editarTarea(datosTarea:any){
    return this.http.put(environment.BASE_API_TABLEROS_TAREAS + '/tarea/actualiza', datosTarea); 
  }

  eliminarActividad(id:number){
    return this.http.delete(environment.BASE_API_ACTIVIDADES + '/actividades/' + `${id}`);
  }

}
