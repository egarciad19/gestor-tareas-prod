import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SesionService } from '../services/sesion.service';
import { Usuario } from '../interfaces/usuario.interface';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login-invitado',
  templateUrl: './login-invitado.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginInvitadoComponent implements OnInit {

  user: any;
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private router: Router, 
    private sesion: SesionService,
  ) { }

  ngOnInit(): void {
    let registrado: boolean = (localStorage.getItem("registrado")=='true') ? true : false;
    
    if (registrado){
      this.router.navigate(['/inicio']);
    }
  }
  

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un valor.';
    }

    return this.email.hasError('email') ? 'Correo Electrónico Inválido.' : '';
  }

  iniciar(){
    if (this.email.value){
      this.sesion.getLoginInvitado(this.email.value).subscribe({
        next: (res) => { 
          //console.warn('SERVICIO CONSUMIDO: ', res);  
        },
        error: (err) => {
          if (err && err.status < 500 && err.error) {
            if (err.error.exception == "GENERAL.ERROR.NOT-FOUND") {
              Swal.fire({
                icon: 'error',
                title: err.error.message,
                text: 'Se produjo un error, recargue la página para reintentar nuevamente.',
                backdrop: false
              });
              console.warn("Ocurrió un error: ", err.error.message);
            } else {
                //Otros Errores
            }
          }
        }
      });
      
    } else {
      this.email.markAsTouched();
    }
    
  }

  //redireccionar a la pagina de registro
  registrarse(){
    this.router.navigate(['/registrarse']);
  }

}

