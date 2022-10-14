import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrearTareaComponent } from '../crear-tarea/crear-tarea.component';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent implements OnInit {

  nombreActividad = new FormControl('', Validators.required);
  descripcionActividad = new FormControl('');

  user: any;
  constructor(public dialogRef: MatDialogRef<CrearTareaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    let usuarioLogueado: any = localStorage.getItem("sesion");
    this.user = JSON.parse(usuarioLogueado);
  }

  closeDialog() {
    let datos = {
      descripcion: this.descripcionActividad.value,
      listaActividad: {
        id: this.data.idLista
      },
      nombreActividad: this.nombreActividad.value,
      usuarioAdiciono: this.user.username
    } 

    this.dialogRef.close(datos);
  }
}
