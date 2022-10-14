import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrearTareaComponent } from '../crear-tarea/crear-tarea.component';

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.component.html',
  styleUrls: ['./editar-tarea.component.css']
})
export class EditarTareaComponent implements OnInit {

  user:any;
  nombreTarea = new FormControl('', Validators.required);
  descripcionTarea = new FormControl();

  constructor(public dialogRef: MatDialogRef<CrearTareaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    let usuarioLogueado: any = localStorage.getItem("sesion");
    this.user = JSON.parse(usuarioLogueado);
  }

  closeDialog() {
    this.data = {
        codigoLista: 1,
        codigoTarea: this.data.id,
        nombreTarea: this.nombreTarea.value,
        descripcion: this.descripcionTarea.value,
        fechaCreacion: new Date(),
        fechaInicio: new Date(),
        fechaFin: new Date(),
        usuarioAdiciono: this.user.username,
        estado: "A"
    }
    this.dialogRef.close(this.data);
  }

}
