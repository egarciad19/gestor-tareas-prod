import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario, UsuarioResponse } from '../interfaces/usuario.interface';
import { Servicios } from './servicios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SaveFormDto, servicioBody } from '../interfaces/servicio.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private registrado = new BehaviorSubject<boolean>(false); //Se almacena y siempre está disponible 

  // URL De Micro Servicio Para Usuarios
  BASE_API_USUARIOS = environment.BASE_API_USUARIOS;
  BASE_API_CORREOS = environment.BASE_API_CORREOS;
  URL_USER = this.BASE_API_USUARIOS + '/user';
  URL_CORREO = this.BASE_API_CORREOS + '/email';

  constructor(
    private http: HttpClient,
    private router: Router, 
    private servicio: Servicios,
    public dialog: MatDialog,
  ) { 
    //localStorage.setItem('registrado', 'false');
  }

  private chequearToken() {
    const tokenUsuario = localStorage.getItem('token');
  }

  private guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  private manipularError(error:any): Observable<never> {
    let errorMensaje = 'Ocurrió un error al recuperar datos.';

    if (error && error.status < 500 && error.error) {
      if (error.error.exception == "GENERAL.ERROR.NOT-FOUND") {
        Swal.fire({
          icon: 'error',
          title: error.error.message,
          text: 'Se produjo un error, recargue la página para reintentar nuevamente.',
          backdrop: false
        })
        console.warn("Ocurrió un error: ", error.error.message)
      } else {
          //Otros Errores
      }
    }
    //window.alert(errorMensaje);
    return throwError(errorMensaje);
  }

  /**
  * verifica si existe un usuario
  * @param id id del Usuario
  */
   getVerificaUsuario(id: string) {
    return this.servicio.getData(this.URL_USER, 'usuarioById', id) //ID COMO PARAMETRO
  }

  get estaLogueado():Observable<boolean>{
    return this.registrado.asObservable();
  }

  /**
  * verifica si los datos son válidos
  * @param autenticacion email y password del usuario
  */
  getLogin(usuario:string, contra: string): Observable<UsuarioResponse | void>{
    return this.servicio.getData(this.URL_USER, 'byUserAndPassword', `${usuario}/${contra}`).pipe( //CREDENCIALES COMO PARAMETRO
      map( (res: any) => { //UsuarioResponse
        if(res){
          //console.log('Respuesta: ', res);
          this.guardarToken('20220918'); // this.guardarToken(res.token)
          localStorage.setItem("sesion", JSON.stringify(res)); //Almacenar credenciales
          this.router.navigate(['/inicio']);
          //return res;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Credenciales Inválidas.',
            backdrop: false
          });
        }
        res ? localStorage.setItem('registrado', 'true') : localStorage.setItem('registrado', 'false'); //Se confirma credenciales y se le asigna true 
        
      }),
      catchError((error) => this.manipularError(error))
    ) 
  }

  getLoginInvitado(email: string): Observable<UsuarioResponse | void>{
    return this.servicio.getData(this.URL_USER, 'byEmail', `${email}`).pipe( //CORREO COMO PARAMETRO
      map( (res: any) => { //UsuarioResponse
        if(res){
          //console.log('Respuesta: ', res);
          this.guardarToken('20220918'); // this.guardarToken(res.token)
          localStorage.setItem("sesion", JSON.stringify(res)); //Almacenar credenciales
          localStorage.setItem("invitado", "true");
          this.router.navigate(['/inicio']);
          //return res;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No existe al menos un tablero asignado a su correo.',
            backdrop: false
          });
        }
        res ? localStorage.setItem('registrado', 'true') : localStorage.setItem('registrado', 'false'); //Se confirma credenciales y se le asigna true 
        
      }),
      catchError((error) => this.manipularError(error))
    ) 
  }

  cerrarSesion(){
    // limpia datos de localStorage
    localStorage.clear();
    //this.registrado.next(true); //Se cierra sesión y se le asigna false
  }

	/**
	* guarda la información de los campos del formulario crear usuario
	* @param value variables a guardar
	* @author Byron
	*/
	postGuardarUsuario(values: any) {
    return this.http.post(`${this.URL_USER}`, values);
	}

  /**
	* Envía un correo al registrar un usuario
	* @param emailDestino y asunto
	* @author Byron
	*/
	getEnviarNotificacion(emailDestino: string, asunto: string) {
		return this.servicio.getData(this.URL_CORREO, `notificacionRegistro/` + `${emailDestino}/${asunto}`).pipe( //PARAMETROS
      map( (res: any) => {
        if(!res){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al intentar enviar el correo de notificación.',
            backdrop: false
          });
        }
      }),
      catchError((error) => this.manipularError(error))
    );
	}

  /**
	* Envía un correo de invitación a un Tablero
	* @param correo, asunto y nombreTablero
	* @author Byron
	*/
	getEnviarInvitacion(correo: string, asunto: string, nombreTablero: string) {
    return this.servicio.getData(this.URL_CORREO, 'notificacionInvitacion', `${correo}/${asunto}/${nombreTablero}`).pipe( //PARAMETROS
      map( (res: any) => {
        if(!res){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al intentar enviar el correo de invitación.',
            backdrop: false
          });
        }
      }),
      catchError((error) => this.manipularError(error))
    );
	}
}
