import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { TableroService } from '../services/tablero.service';

@Component({
  selector: 'app-crear-tablero',
  templateUrl: './crear-tablero.component.html',
  styleUrls: ['./crear-tablero.component.css']
})
export class CrearTableroComponent implements OnInit {

  nombreTablero = new FormControl('',[Validators.required]);
  descripcion = new FormControl();
  user: any; 

  constructor(private tableroService: TableroService, private router: Router) { }

  ngOnInit(): void {
    let usuarioLogueado: any = localStorage.getItem("sesion");
    this.user = JSON.parse(usuarioLogueado);
  }

  async crearTablero(){
    if(this.nombreTablero.valid){
      let datosTablero = {
        descripcion: this.descripcion.value,
        esPbulico: "true",
        estado: "A",
        nombreTablero: this.nombreTablero.value,
        usuarioAdiciono: this.user.username,
        usuarioAsignacion: null
      }
      await lastValueFrom(this.tableroService.crearTablero(datosTablero));
      Swal.fire({
        icon: 'success',
        title: '¡Tablero ha sido creado con éxito!',
        backdrop: false,
        showConfirmButton: false,
        timer: 2000,
      });

      this.router.navigate(['/tableros']);
    }
  }


}
