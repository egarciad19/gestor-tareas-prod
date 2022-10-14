import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: any; 

  constructor(private router: Router, private sesion: SesionService) { }

  ngOnInit(): void {
    let usuarioLogueado: any = localStorage.getItem("sesion");
    this.user = JSON.parse(usuarioLogueado);

    if(localStorage.getItem("invitado")=="true"){
      this.user.username = "Invitado";
    }
  }

  salir(){
    this.sesion.cerrarSesion();
    this.router.navigate(['/login']);
  }

}
