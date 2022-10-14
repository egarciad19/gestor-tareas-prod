import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CrearTareaComponent } from '../crear-tarea/crear-tarea.component';
import { ActivatedRoute } from '@angular/router';
import { TableroService } from '../services/tablero.service';
import { CrearListaTareaComponent } from '../crear-lista-tarea/crear-lista-tarea.component';
import { Router } from '@angular/router';
import { TareaService } from '../services/tarea.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';
import { ComentariosService } from '../services/comentarios.service';
import { EtiquetaService } from '../services/etiqueta.service';
import { CompartirComponent } from '../compartir/compartir.component';

@Component({
  selector: 'app-tablero-seleccionado',
  templateUrl: './tablero-seleccionado.component.html',
  styleUrls: ['./tablero-seleccionado.component.css']
})
export class TableroSeleccionadoComponent implements OnInit {
 
  //dialog en mismo componente. 
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;

  @ViewChild('callEliminarDialog')
  callEliminarDialog!: TemplateRef<any>;
  
  @ViewChild('callEtiquetaDialog')
  callEtiquetaDialog!: TemplateRef<any>;

  
  //acceso al textArea de comentario
  @ViewChild("comentario", { static: false })
  //referencia al input
  InputVar!: ElementRef;

  verTarea = false; 
  panelOpenState = false;
  idTablero : number = 0; 
  tablero : any = {};
  comentando = false; 
  existenListas = true;
  mostrarComentarios = false;

  //Tarea Seleccionada:
  idTarea!:number; 
  nombreTarea!:string; 
  descripcionTarea!:string; 
  idListadoTarea!:number;
  nombreListadoTarea!:string;
  detalleTarea!:boolean; 
  detalleActividad!:boolean; 

  listaTareas: any = [];

  arrayListas: any = [];

  etiquetas: any = [];
   
  nombreTablero = new FormControl('',[Validators.required]);
  descripcion = new FormControl();
  estado = new FormControl();
  usuarioAdiciono = new FormControl();
  usuarioAsignado = new FormControl();
  esPublico = new FormControl();

  comentarioIngresado = new FormControl();
  nuevaEtiqueta = new FormControl();

  comentarios: any = [];
  user:any;
  

  
  constructor(private tableroService: TableroService, private tareaService: TareaService,  public dialog: MatDialog, 
    private route: ActivatedRoute, private router: Router, private comentariosService: ComentariosService,
    private etiquetaService: EtiquetaService) { 
    
    this.route.params.subscribe(params => {
      this.idTablero = params['id'];
    });

    this.refrescarListas();
    
  }

  ngOnInit(): void {
    let registrado: boolean = (localStorage.getItem("registrado")=='true') ? true : false;
   
    if (registrado){
      let usuarioLogueado: any = localStorage.getItem("sesion");
      this.user = JSON.parse(usuarioLogueado);
    } else {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }

  
  refrescarListas(){
    this.tableroService.getTableroId(this.idTablero).subscribe(tab => {
      this.tablero = tab;
    });

    this.listaTareas = [];

    this.tableroService.getListasTareaByIdTablero(this.idTablero).subscribe(listas => {
      this.listaTareas = listas;
      this.existenListas = (this.listaTareas.length > 0) ? true : false;

      this.arrayListas = [];
      
      for(let i in this.listaTareas){
        let arrayTareas : any = [];
        this.tableroService.getTareasByCodLista(this.listaTareas[i].codigoLista).subscribe(t => {
          arrayTareas = t;

          if(Array.isArray(this.arrayListas)){
            this.arrayListas.push({
              codigoLista: this.listaTareas[i].codigoLista,
              codigoTablero: this.listaTareas[i].codigoTablero,
              estado: this.listaTareas[i].estado,
              fechaCreacion: this.listaTareas[i].fechaCreacion,
              nombreLista: this.listaTareas[i].nombreLista,
              usuarioAdiciono: this.listaTareas[i].usuarioAdiciono,
              tareas: arrayTareas
            });
          } 
        });
        
      }
      
   });

  }  

  openCrearTarea(idLista:number, nombreLista:string){
    this.tareaService.abrirCrearTareaDialog(idLista, nombreLista)
    .afterClosed().subscribe(async res =>{
      if(res){
        await lastValueFrom(this.tareaService.crearTarea(res));
        this.tareaService.getListasTareas().subscribe(listas => {
          this.listaTareas = listas;
          this.refrescarListas();
        });
        Swal.fire({
          icon: 'success',
          title: '¡Nueva Tarea Creada con Éxito!',
          backdrop: false,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    })
  }

  openCrearListaTarea(){
    this.tareaService.abrirCrearListaTareaDialog(this.idTablero)
    .afterClosed().subscribe(async res =>{
      if(res){
        await lastValueFrom(this.tareaService.crearListaTarea(res)); 
        this.refrescarListas();
        Swal.fire({
          icon: 'success',
          title: '¡Lista de Tarea Creada con Éxito!',
          backdrop: false,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    })
  }


  verTareaSeleccionada(id:number, ntarea:string, codLista:number, jListadoT:string){
    this.mostrarComentarios = true;
    this.comentariosService.getComentariosByIdTarea(id).subscribe(c => {
      this.comentarios = c;
    });
    this.verTarea = true; 
    this.idTarea = id;
    this.nombreTarea = ntarea; 
    this.idListadoTarea = codLista;
    this.nombreListadoTarea = jListadoT;
  }

  agregandoComentario(){
    this.comentando = true; 
  }

  async crearComentario(){
    let comentarioNuevo = {
      comentario: this.comentarioIngresado.value,
      idTarea: this.idTarea,
      usuarioAdiciono: this.user.username
    }
    await lastValueFrom(this.comentariosService.postComentario(comentarioNuevo));
    this.comentariosService.getComentariosByIdTarea(this.idTarea).subscribe(c => {
      this.comentarios = c;
      this.comentarioIngresado.setValue('');
    });
    
  }

  ocultarBotonComentario(){
    this.comentando = false; 
  }

  limpiarComentario(){
    this.InputVar.nativeElement.value = "";
  }

  cargarOtraVez(){
    this.tareaService.getListasTareas().subscribe(listas => {

      console.log(listas);
      this.listaTareas = listas;
    });

    /*
    this.tareaService.getTareasByIdListaTareas().subscribe(tr =>{
      console.log(tr);
      this.tareas = tr; 
    });  */
  }

  editarTableroSeleccionado() {
    this.nombreTablero.setValue(this.tablero.nombreTablero);
    this.descripcion.setValue(this.tablero.descripcion);
    this.estado.setValue(this.tablero.estado);
    this.usuarioAdiciono.setValue(this.tablero.usuarioAdiciono);
    this.usuarioAsignado.setValue(this.tablero.usuarioAsignacion);
    this.esPublico.setValue(this.tablero.esPbulico);

    let dialogRef = this.dialog.open(this.callAPIDialog, {
      height: 'auto',
      width: '30%'
    });
    dialogRef.afterClosed().subscribe( async result => {
        // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
        if (result) {
            if (result === 'yes') {
                let datosTableroEditado = {
                    codigoTablero: this.idTablero,
                    descripcion: this.descripcion.value,
                    esPbulico: this.esPublico.value,
                    estado: this.estado.value,
                    nombreTablero: this.nombreTablero.value,
                    usuarioAdiciono: this.usuarioAdiciono.value,
                    usuarioAsignacion: this.usuarioAsignado.value
                }
                await lastValueFrom(this.tableroService.editarTablero(datosTableroEditado));
                this.refrescarListas();
            } else if (result === 'no') {
                // TODO: Replace the following line with your code.
                console.log('User clicked no.');
            }
        }
    })
  }

  eliminarTableroSeleccionado(){
    let dialogRef = this.dialog.open(this.callEliminarDialog, {
      height: 'auto',
      width: '30%'
    });
    dialogRef.afterClosed().subscribe( async result => {
      if (result !== undefined) {
          if (result === 'yes') {
            await lastValueFrom(this.tableroService.eliminarTablero(this.idTablero));
            this.router.navigate(['/tableros']);
          } else if (result === 'no') {
              // TODO: Replace the following line with your code.
          }
      }
  })
  }

  verCrearEtiquetas(){
    this.etiquetaService.getEtiquetas().subscribe(e => {
      this.etiquetas = e;
      console.log(this.etiquetas)
    });


    let dialogRef = this.dialog.open(this.callEtiquetaDialog, {
      height: 'auto',
      width: '30%'
    });
    dialogRef.afterClosed().subscribe( async result => {
      if (result) {
          if (result === 'yes') {
            
          } else if (result === 'no') {
            
          }
      }
  })
  }

  async crearEtiqueta(){
    let datosEtiqueta = {
      codigoTablero: this.idTablero,
      descripcion: "",
      estado: "A",
      fechaCreacion: new Date(),
      nombreEtiqueta: this.nuevaEtiqueta.value,
      usuarioAdiciono: this.user.username
    }
    await lastValueFrom(this.etiquetaService.postEtiqueta(datosEtiqueta));
    this.etiquetaService.getEtiquetas().subscribe(e => {
      this.etiquetas = e;
    });
  }

  async eliminarEtiqueta(id:number){
    await lastValueFrom(this.etiquetaService.deleteEtiqueta(id));
    this.etiquetaService.getEtiquetas().subscribe(e => {
      this.etiquetas = e;
    });
  }

  compartir(): void{
  //   let datosTableroEditado = {
  //     codigoTablero: this.idTablero,
  //     descripcion: this.descripcion.value,
  //     esPbulico: this.esPublico.value,
  //     estado: this.estado.value,
  //     nombreTablero: this.nombreTablero.value,
  //     usuarioAdiciono: this.usuarioAdiciono.value,
  //     usuarioAsignacion: this.usuarioAsignado.value
  // }
  
    let dialogRef = this.dialog.open(CompartirComponent, {
      width: '50%',
      height: '30%',
      data: {tablero: this.tablero},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('Correo Enviado, ', result)
    });
}

}


