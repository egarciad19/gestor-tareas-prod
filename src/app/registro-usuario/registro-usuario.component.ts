import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SesionService } from '../services/sesion.service';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { CompartirComponent } from '../compartir/compartir.component';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['../app.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private router: Router, 
    private sesion: SesionService,
    private dialog: MatDialog,
  ) { 
    this.formulario = new FormGroup({
      //usuario   : new FormControl('', [Validators.required]),
      nombre   : new FormControl('', [Validators.required]),
      apellido : new FormControl('', [Validators.required]),
      email    : new FormControl('', [Validators.required, Validators.email]),
      telefono : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    let registrado: boolean = (localStorage.getItem("registrado")=='true') ? true : false;

    if (registrado){
      this.router.navigate(['/inicio']);
    }
  }

  hide = true;
  // nombre = new FormControl('', [Validators.required]);
  // email = new FormControl('', [Validators.required, Validators.email]);
  // password = new FormControl('', [Validators.required]);

  formulario: FormGroup;

  //Mostrar errores en formulario
  getErrorMessage( campo: string ){
    if (this.formulario.controls[campo].hasError('required')){
      return 'Debe llenar todos los campos obligatorios (*)';
    } else if (this.formulario.controls[campo].hasError('email')){
      return 'Ingrese un correo electrónico válido.';
    } else if (this.formulario.controls[campo].hasError('revisar')){
      return 'Revise que todos los datos estén correctos. \nLas contraseñas deben coincidir.';
    }
    return;
  }

  crearCuenta(){
    this.formulario.markAllAsTouched();

    if (this.formulario.valid && (this.formulario.controls['password'].value == this.formulario.controls['password2'].value)){
      let variables = this.convertRequest();

      this.sesion.postGuardarUsuario(variables).subscribe({
        next: (res) => {
          if (res){
            Swal.fire({
              icon: 'success',
              title: 'Su cuenta ha sido creada satisfactoriamente.',
              backdrop: false,
              showConfirmButton: false,
              timer: 2000,
            });

            this.sesion.getEnviarNotificacion(this.formulario.controls['email'].value, 'Bienvenido a Organizador de Tareas').subscribe({
              next: (res) => {
                console.warn('CORREO ENVIADO: ', res);
              },
              error: (err) => {
                if (err && err.status < 500 && err.error) {
                  if (err.error.exception == "GENERAL.ERROR.NOT-FOUND") {
                    Swal.fire({
                      icon: 'error',
                      title: err.error.message,
                      text: 'Se produjo un error al enviar el correo de notificación.',
                      backdrop: false
                    });
                    console.warn("Ocurrió un error: ", err.error.message);
                  } else {
                      //Otros Errores
                  }
                }
              }
            });
          }
          console.warn('SERVICIO CONSUMIDO: ', res);
          this.formulario.reset();
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
      this.formulario.controls['password2'].setErrors({'revisar': true});
      this.formulario.markAllAsTouched();
    }  
  }

  //redireccionar a la pagina de registro
  cancelar(){
    this.router.navigate(['/login']);
  }

  convertRequest(){
    let res = {
      apellido: this.formulario.controls['apellido'].value,
      email   : this.formulario.controls['email'].value,
      nombre  : this.formulario.controls['nombre'].value,
      password: this.formulario.controls['password'].value,
      telefono: this.formulario.controls['telefono'].value,
      username: this.generarUsuario()
    }
    return res;
  }

  generarUsuario(){
    let index = this.formulario.controls['email'].value.indexOf('@');
    return this.formulario.controls['email'].value.slice(0,index);
  }

}
