import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrearTareaComponent } from '../crear-tarea/crear-tarea.component';

@Component({
  selector: 'app-crear-lista-tarea',
  templateUrl: './crear-lista-tarea.component.html',
  styleUrls: ['./crear-lista-tarea.component.css']
})
export class CrearListaTareaComponent implements OnInit {
  user: any;
  nombre = new FormControl('', Validators.required);
  //descripcionLista = new FormControl('');

  constructor(public dialogRef: MatDialogRef<CrearTareaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    let usuarioLogueado: any = localStorage.getItem("sesion");
    this.user = JSON.parse(usuarioLogueado);
  }

  closeDialog() {
    this.data = {
      codigoTablero: this.data.idTablero,
      estado: "A",
      fechaCreacion: new Date(),
      nombreLista: this.nombre.value,
      usuarioAdiciono: this.user.username
    }

    
    this.dialogRef.close(this.data);
  }
}
