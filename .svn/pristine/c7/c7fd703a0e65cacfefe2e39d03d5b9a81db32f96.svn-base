import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService {

  constructor(private http: HttpClient) { }

  getEtiquetas(){
    return this.http.get(environment.BASE_API_TABLEROS_TAREAS + '/etiqueta/obtener/registros');
  }

  postEtiqueta(etiqueta:any){
    return this.http.post(environment.BASE_API_TABLEROS_TAREAS + '/etiqueta/crea', etiqueta);
  }

  deleteEtiqueta(id:number){
    return this.http.delete(environment.BASE_API_TABLEROS_TAREAS + '/etiqueta/' + `${id}`);
  }
}
