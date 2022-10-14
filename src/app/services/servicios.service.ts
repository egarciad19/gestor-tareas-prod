import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { servicioBody } from '../interfaces/servicio.interface';

@Injectable({
    providedIn: 'root'
})

export class Servicios {

    constructor(private http: HttpClient) {
        //console.log("Ingresa a Servicios.");
    }

    /**
    * Metodo que realiza un get a un microservicio haciendo uso de un solo parametro
    * enviando el valor en la url ejemplo http://localhost:8091/swagger-ui.html#/user-controller/findAllUsersByIdUserUsingGET
    * @param pUrl url del microservicio ejemplo http://localhost:8091/metodoGet
    * @param pNombreServicio nombre del servicio a llamar. Puede ser null
    * @param pParametro parametro que se envia al servicio este puede ser null si no se envia parametro
    * @author Grupo4
    */
    getData(pUrl: string, pNombreServicio: string | null, pParametro: string | null = null) {

        if (pNombreServicio == null) {
            if (pParametro === null) {
                return this.http.get(`${pUrl}`);
            } else {
                return this.http.get(`${pUrl}/${pParametro}`);
            }
        } else {
            if (pParametro === null) {
                return this.http.get(`${pUrl}/${pNombreServicio}`);
            } else {
                return this.http.get(`${pUrl}/${pNombreServicio}/${pParametro}`);
            }
        }
    }

    /**
    * Metodo que realiza un get a un microservicio haciendo uso de un solo parametro
    * @param pUrl url del microservicio a consumir ejemplo http://localhost:8091/metodoPost
    * @param pParametro parametro del metodo post este puede ser null si no lleva parametro
    * @param pBody body del servicio con la estructura de la interface servicioBody obtiene la variable
    *              body de la interface que debe contener la estructura de envio del microservicio si se
    *              necesita agregar una nueva estructura se debe agregar en la interface
    * @param pResponseText true cuando la respuesta del servicio es de tipo texto y false(por defecto) cuando el servicio responde un json.
    */
     public postData(pUrl: string, pNombreServicio: string | null, pBody: servicioBody | any = {body: null},pResponseText:boolean=false) {
        let body = pBody && pBody.body ? pBody.body : null;

        if (pNombreServicio === null) {
            if(pResponseText){
                return this.http.post(pUrl, body);
            }
            return this.http.post(pUrl, body);
        } else {
            if(pResponseText){
                return this.http.post(`${pUrl}/${pNombreServicio}`, body);
            }
            return this.http.post(`${pUrl}/${pNombreServicio}`, body);
        }

    }
}