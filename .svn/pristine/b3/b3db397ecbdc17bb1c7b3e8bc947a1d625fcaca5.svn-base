import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TareaService } from '../services/tarea.service';
import { lastValueFrom } from 'rxjs';
import { ActividadesService } from '../services/actividades.service';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-tarea-seleccionada',
  templateUrl: './tarea-seleccionada.component.html',
  styleUrls: ['./tarea-seleccionada.component.css']
})
export class TareaSeleccionadaComponent implements OnChanges {

  user:any;

  @ViewChild('callEliminarDialog')
  callEliminarDialog!: TemplateRef<any>;
  
  @ViewChild('callEliminarActividadesDialog')
  callEliminarActividadDialog!: TemplateRef<any>;
   
  @Input() idTareaSeleccionada!:number; 
  @Input() nombreTareaSeleccionada!:string;
  @Input() idListaTareaSeleccionada!:number; 
  @Input() nombreListaTareaSeleccionada!:string; 

  //@Input() tablaActividades!:boolean; 
  //@Input() actividadSeleccionada!:boolean;

  tablaActividades = false; 
  actividadSeleccionada = false;
  noListaActividades = false; 
  noActividades = false;

  inputEditarActividad = false;
  idSelectedActividad!:number;
  nombreActividad = new FormControl();
  
  panelOpenState = false;

  nombreListadoActividad!: string;
  listaActividades = [
    {id: 1, actividad: 'Realizar investgación', estado: false},
    {id: 2, actividad: 'Leer pagnias 1-10', estado: false},
    {id: 3, actividad: 'Realiar sítesis del tema', estado: false},
    {id: 4, actividad: 'Realizar trabajo escrito', estado: false},
  ]

  actividadCompletada:boolean = false; 
  nombreActividadCompletada!:string; 
  porcentaje = 0.0; 

  displayedColumns: string[] = ['position', 'lista', 'CantidadActividade', 'porcentaje'];
  dataSource:any = {};

  tableData: any = [];
  arregloTabla: any = [];

  idListActSeleccionada!:number;
  nomListadoActSeleccionada!:string;

  actividades: any = [];

  actividadEditar: any = {};

  constructor(private tareaService: TareaService, private actividadesService:ActividadesService, 
    public dialog: MatDialog, private router: Router) { 
      let usuarioLogueado: any = localStorage.getItem("sesion");
      this.user = JSON.parse(usuarioLogueado);
    }

  ngOnChanges(changes: SimpleChanges): void {
   const idTareaSeleccionadaValue = changes['idTareaSeleccionada'];
    if(idTareaSeleccionadaValue.currentValue !== idTareaSeleccionadaValue.previousValue){
      this.tablaActividades = true; 
      this.actividadSeleccionada = false;
      this.refrescarListas();
    }
  }

  refrescarListas(){
    this.actividadesService.getListasActividadesByIdTarea(this.idTareaSeleccionada).subscribe(t => {
      this.tableData = t;
      
      this.arregloTabla = [];
      for(let i in this.tableData){
        this.actividadesService.getActividadesByIdLista(this.tableData[i].id).subscribe(a => {
          this.actividades = a;
          let cantidad = this.actividades.length;
          this.completarActividad(this.idListActSeleccionada)
          this.arregloTabla.push({id: this.tableData[i].id, nombre: this.tableData[i].nombreLista,  total: cantidad, porcent: this.porcentaje})
      });
      }


      if(this.tableData.length > 0){
        this.tablaActividades = true; 
        this.actividadSeleccionada = false;
        this.noListaActividades = false;
      } else {
        this.tablaActividades = false; 
        this.actividadSeleccionada = false;
        this.noListaActividades = true;
      }
    })
  }


  verListadoActividad(idlista:number, nomLista:string){
    this.actividadSeleccionada = true; 
    this.tablaActividades = false; 
    this.noListaActividades = false;

    this.idListActSeleccionada = idlista;
    this.nomListadoActSeleccionada = nomLista;

    this.actividadesService.getActividadesByIdLista(this.idListActSeleccionada).subscribe(a => {
        this.actividades = a;
        this.completarActividad(this.idListActSeleccionada);
        this.noActividades = (this.actividades.length == 0) ? true : false;
    });
  }

  verTablaActividades(){
    this.actividadSeleccionada = false;
    this.tablaActividades = true; 
    this.refrescarListas();
  }

  completarActividad(idActividad:number){
    let totalCompletados = 0; 
    let total = this.actividades.length;
    for(let i in this.actividades){
      if(this.actividades[i].id == idActividad){
        if(this.actividades[i].estado == true){
          this.actividades[i].estado = false;          
        } else {
          this.actividades[i].estado = true;  
        }
        this.actividadCompletada = this.actividades[i].estado; 
        this.nombreActividadCompletada = this.actividades[i].actividad;
      }
    }
    for(let i in this.actividades){
      if(this.actividades[i].estado == true){
        totalCompletados++;
      }
    }
    this.porcentaje = totalCompletados/total; 
  }

  editarTareaSeleccionada(){
    this.tareaService.abrirEditarTareaDialog(this.dataSource.codigoTarea, this.dataSource.nombreTarea)
    .afterClosed().subscribe(async res =>{

      if(res !== undefined){
        await lastValueFrom(this.tareaService.editarTarea(res));
        this.tareaService.obtenerTarea(res.codigoTarea).subscribe(t => {
          this.dataSource = t;
        });
      } 
    })
  }

  crearListaActividad(){
    this.actividadesService.abrirCrearListaActividad(this.idTareaSeleccionada)
    .afterClosed().subscribe(async res => {
      if(res !== undefined){
        await lastValueFrom(this.actividadesService.crearListaActividad(res));
        this.refrescarListas();
      } 
      Swal.fire({
        icon: 'success',
        title: '¡Lista de Actividades Creada con Éxito!',
        backdrop: false,
        showConfirmButton: false,
        timer: 2000,
      });
    });
  }

  crearActividad(){
    this.actividadesService.abrirCrearActividad(this.idListActSeleccionada, this.nomListadoActSeleccionada)
    .afterClosed().subscribe(async res => {
      if(res !== undefined){
        await lastValueFrom(this.actividadesService.crearActividad(res));
        this.actividadesService.getActividadesByIdLista(this.idListActSeleccionada).subscribe(a => {
          this.actividades = a;
          this.completarActividad(this.idListActSeleccionada);
          this.noActividades = false;
        });
        Swal.fire({
          icon: 'success',
          title: '¡Nueva Actividad Creada con Éxito!',
          backdrop: false,
          showConfirmButton: false,
          timer: 2000,
        });
      } 
    });
  }

  async guardarCambios(){
    
    for(let i in this.actividades){
      let datos = {
        id: this.actividades[i].id,    
        nombreActividad: this.actividades[i].nombreActividad,
        descripcion: this.actividades[i].descripcion,
        estado: this.actividades[i].estado
        }
        await lastValueFrom(this.actividadesService.editarActividad(datos));
    }
    Swal.fire({
      icon: 'success',
      title: '¡Cambios Guardados!',
      backdrop: false,
      showConfirmButton: false,
      timer: 2000,
    });

      this.verTablaActividades()
  }

  eliminarTableroSeleccionado(){
    let dialogRef = this.dialog.open(this.callEliminarDialog, {
      height: 'auto',
      width: '30%'
    });
    dialogRef.afterClosed().subscribe( async result => {
      if (result !== undefined) {
          if (result === 'yes') {
            console.log(this.idListaTareaSeleccionada, this.nombreListaTareaSeleccionada)
            await lastValueFrom(this.tareaService.eliminarListaTarea(this.idListaTareaSeleccionada));
            this.refrescarListas();
          } else if (result === 'no') {
              // TODO: Replace the following line with your code.
          }
      }
  })
  }

  editarListaActividades(){

    console.log(this.idListActSeleccionada);

    this.actividadesService.getActividadesByIdLista(this.idListActSeleccionada).subscribe(a => {
        this.actividades = a;
    });

    this.dialog.open(this.callEliminarActividadDialog, {
      height: 'auto',
      width: '30%'
    });

  }

  async eliminarActividad(id:number){
    await lastValueFrom(this.tareaService.eliminarActividad(id));
    this.actividadesService.getActividadesByIdLista(this.idListActSeleccionada).subscribe(a => {
          this.actividades = a;
          this.completarActividad(this.idListActSeleccionada);
    });
  }

  habilitarInputEdit(id:number){
    //console.log(id, nombre, this.nombreActividad.value);
    this.inputEditarActividad = true;
    this.idSelectedActividad = id;
  }

  async editarNombreActividad(id:number, nombre:string){
    for(let i in this.actividades){
      if(this.actividades[i].id === id){
        let datos = {
          id: this.actividades[i].id,    
          nombreActividad: this.nombreActividad.value,
          descripcion: this.actividades[i].descripcion,
          estado: this.actividades[i].estado
        }
        await lastValueFrom(this.actividadesService.editarActividad(datos));
        this.actividadesService.getActividadesByIdLista(this.idListActSeleccionada).subscribe(a => {
          this.actividades = a;
          this.completarActividad(this.idListActSeleccionada);
        });
        break;
      }
    }
    this.inputEditarActividad = false;
  }

}

