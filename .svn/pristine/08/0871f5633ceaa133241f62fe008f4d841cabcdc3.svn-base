import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TableroService {

  constructor(private http: HttpClient) { }

  getTableros(){
    return this.http.get(environment.BASE_API_TABLEROS_TAREAS + '/tablero/obtener/registros'); 
  }

  getTableroId(idTablero : number){
    return this.http.get(environment.BASE_API_TABLEROS_TAREAS + '/tablero/'+ `${idTablero}`);
  }

  getActividades(id:number){
    let resultado = 'tablero 1';
    if(id === 1){
      return resultado;
    } else{
      resultado = 'tablero 2';
      return resultado; 
    }
  }

  crearTablero(datosTablero: any){
    return this.http.post(environment.BASE_API_TABLEROS_TAREAS + '/tablero/crea', datosTablero);
  }

  editarTablero(datosTablero: any){
    return this.http.put(environment.BASE_API_TABLEROS_TAREAS + '/tablero/actualiza', datosTablero);
  }

  eliminarTablero(idTablero: number){
    return this.http.delete(environment.BASE_API_TABLEROS_TAREAS + '/tablero/' + `${idTablero}`)
  }

  getListasTareaByIdTablero(idTab: number){
    return this.http.get(environment.BASE_API_TABLEROS_TAREAS + '/lista/obtener/listas/' + `${idTab}`);
  }

  getTareasByCodLista(idList: number){
    return this.http.get(environment.BASE_API_TABLEROS_TAREAS + '/tarea/obtener/tareas/' + `${idList}`);
  }

  getTablerosByUsuario(username: string){
    return this.http.get(environment.BASE_API_TABLEROS_TAREAS + '/tablero/obtener/tableros/tipo/' + `${username}`);
  }
}
