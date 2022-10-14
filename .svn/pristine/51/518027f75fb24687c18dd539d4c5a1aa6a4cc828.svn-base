import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css']
})
export class CrearTareaComponent implements OnInit {
  user: any;
  nombreTarea = new FormControl('', Validators.required);
  descripcionTarea = new FormControl();


  constructor(private tareaService: TareaService, private router: Router,
    public dialogRef: MatDialogRef<CrearTareaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit(): void {
    let usuarioLogueado: any = localStorage.getItem("sesion");
    this.user = JSON.parse(usuarioLogueado);
  }

  closeDialog() {
    this.data = {
      codigoLista: this.data.id,
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
