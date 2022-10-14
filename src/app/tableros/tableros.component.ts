import { Component, OnInit } from '@angular/core';
import { TableroService } from '../services/tablero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tableros',
  templateUrl: './tableros.component.html',
  styleUrls: ['./tableros.component.css']
})
export class TablerosComponent implements OnInit {

  user: any;
  tableros: any = []; 
  existenTableros:boolean = true;

  constructor(private tableroService: TableroService, private router: Router) {
    let usuarioLogueado: any = localStorage.getItem("sesion");
    this.user = JSON.parse(usuarioLogueado);
    
    this.tableroService.getTablerosByUsuario(this.user.username).subscribe(t =>{
      if(localStorage.getItem("invitado")==="true"){
        this.user.nombre = "has ingresado como Invitado";
        this.tableros = t;
        this.tableros = this.tableros.filter(
          (tablero: { 
            codigoTablero: number;
            descripcion: string;
            esPbulico: string;
            estado: string;
            nombreTablero: string;
            usuarioAdiciono: number;
            usuarioAsignacion: number;
          }) => tablero.usuarioAsignacion == this.user.username
        );
      } else {
        this.tableros = t;
        this.tableros = this.tableros.filter(
          (tablero: { 
            codigoTablero: number;
            descripcion: string;
            esPbulico: string;
            estado: string;
            nombreTablero: string;
            usuarioAsignacion: number;
            usuarioAdiciono: number;
          }) => (tablero.usuarioAdiciono == this.user.username)||(tablero.usuarioAsignacion == this.user.username)
        );
      }
      this.existenTableros = (this.tableros.length > 0) ? true : false;
    });
    
   }

  ngOnInit(): void {}


  irTableroSeleccionado(id:number){
    this.router.navigate(['/tablero', id]);
  }


}
