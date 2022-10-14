import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SesionService } from '../services/sesion.service';
import { TableroService } from '../services/tablero.service';
import Swal from 'sweetalert2';
import { ThisReceiver } from '@angular/compiler';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-compartir',
  templateUrl: './compartir.component.html',
  styleUrls: ['../app.component.css']
})
export class CompartirComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private sesion: SesionService,
    private tableroService: TableroService,
    private dialogRef: MatDialogRef<CompartirComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un valor.';
    }

    return this.email.hasError('email') ? 'Correo Electrónico Inválido.' : '';
  }

  cerrar() {
		this.dialogRef.close();
	}

  enviarInvitacion(){
    if(this.email.value && this.email.valid){
      let variables = this.convertRequest(); //Datos del nuevo usuario

      this.sesion.postGuardarUsuario(variables).subscribe({
        next: (resGuardar) => {
          if (resGuardar){
            this.actualizarTablero();

            // Enviar Invitación a Tablero
            this.sesion.getEnviarInvitacion(this.email.value, 'Invitacion a Tablero', this.data.tablero.nombreTablero).subscribe({
              next: (res) => {
                this.email.reset();
                console.log('CORREO ENVIADO: ', res); 
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
              },
            });
          }
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

      Swal.fire({
        icon: 'success',
        title: 'Se ha enviado la invitación al correo electrónico: ' + this.email.value,
        backdrop: false,
        showConfirmButton: false,
        timer: 4000,
      });
      this.cerrar();
    } else {
      this.email.markAsTouched();
    }
  }

  convertRequest(){
    let res = {
      apellido: "",
      email   : this.email.value,
      nombre  : "Invitado",
      password: "",
      telefono: "",
      username: this.generarUsuario()
    }
    return res;
  }

  generarUsuario(){
    let index = this.email.value.indexOf('@');
    return this.email.value.slice(0,index);
  }

  async actualizarTablero(){
    let datosTableroEditado = {
      codigoTablero: this.data.tablero.codigoTablero,
      descripcion: this.data.tablero.descripcion,
      esPbulico: this.data.tablero.esPbulico,
      estado: this.data.tablero.estado,
      nombreTablero: this.data.tablero.nombreTablero,
      usuarioAdiciono: this.data.tablero.usuarioAdiciono,
      usuarioAsignacion: this.generarUsuario()
    }
    await lastValueFrom(this.tableroService.editarTablero(datosTableroEditado));
  }

}
