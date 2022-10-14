import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrearTareaComponent } from '../crear-tarea/crear-tarea.component';

@Component({
  selector: 'app-crear-lista-actividad',
  templateUrl: './crear-lista-actividad.component.html',
  styleUrls: ['./crear-lista-actividad.component.css']
})
export class CrearListaActividadComponent implements OnInit {
  user: any;
  nombre = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<CrearTareaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    let usuarioLogueado: any = localStorage.getItem("sesion");
    this.user = JSON.parse(usuarioLogueado);
  }

  closeDialog() {
    let datos = {
      estado: true,
      fechaAdicion: new Date(),
      idTarea: this.data.idTarea,
      nombreLista: this.nombre.value,
      usuarioAdiciono: this.user.username
    }
    this.dialogRef.close(datos);
  }

}
