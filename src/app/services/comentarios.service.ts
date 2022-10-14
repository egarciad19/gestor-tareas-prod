import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private http: HttpClient) { }

  getComentarios(){
    return this.http.get(environment.BASE_API_COMENTARIOS + '/comentarios');
  }

  getComentariosByIdTarea(idtarea:number){
    return this.http.get(environment.BASE_API_COMENTARIOS + '/comentarios/byIdTarea/' + `${idtarea}`);
  }

  postComentario(comentario:any){
    return this.http.post(environment.BASE_API_COMENTARIOS + '/comentarios', comentario);
  }
}
