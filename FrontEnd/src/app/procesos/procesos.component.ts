import { Component, OnInit } from '@angular/core';
import { SBMServicioService } from '../sbmservicio.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.css']
})
export class ProcesosComponent implements OnInit {

  title = "MANEJO DE PROCESOS";

  Procesos: any = [];
  MiProceso: any = [];
  MiProcesoE: any = [];
  MiProcesoA: any = [];

  filtrarProceso: FormGroup;
  InsertarGProceso: FormGroup;
  ActualizarAProceso: FormGroup;

  tituloProcesos = "";
  tituloProceso = "";
  tituloProcesoEditar = "";

  constructor(
      private formBuilder: FormBuilder,
      private servi: SBMServicioService,
      Router: Router) { }

  //=============================================================
  //LOS CRUL
  //=============================================================

  consultaProcesos() {
    this.servi.getProcesos().subscribe((data: {proceso: []}) => {this.Procesos = data;}, error => {console.error(error + " ")});
    this.tituloProcesos = "";
  }

  //--------------------------------------------------------------

  public buscarProcesos(id) {
    var filtovalor = this.filtrarProceso.getRawValue()['textfiltro'];
    this.servi.getProceso('/' + filtovalor).subscribe((data: {}) => {this.MiProceso = data;}, error => {console.log(error)});
    this.tituloProceso ="";
  }

  //--------------------------------------------------------------

  public InsertarProceso() {
    var datosvalo2 = this.InsertarGProceso.getRawValue()['textNomProc'];
    var datosvalo3 = this.InsertarGProceso.getRawValue()['textDescProc'];
    var datosvalo4 = this.InsertarGProceso.getRawValue()['textIdTipProc'];
    var datosvalo5 = this.InsertarGProceso.getRawValue()['textIdProducto'];
    var cadena = {"nombre_proceso":datosvalo2,"descipcion_proceso":datosvalo3,"id_tipo_proceso":datosvalo4,
    "id_producto":datosvalo5};
    this.servi.insertProceso(cadena).then(res => {console.log(res)}).catch(err =>
      {console.log(err)});
  }

  //--------------------------------------------------------------

  buscarEditarProceso(id) {
    var filtoEvalor = this.ActualizarAProceso.getRawValue()['ActualizarIdProceso'];
    this.servi.getProceso('/' + filtoEvalor).subscribe((data: {}) => {
      this.MiProcesoE = data;
    }, error => { console.log(error) });
    this.tituloProcesoEditar = "";
  }

  //--------------------------------------------------------------

  public ActualizarProceso() {
    console.log("Actualiza tipprod asdsadasdsa")
    var textIdProc = this.ActualizarAProceso.getRawValue()['ActualizarIdProceso'];
    var textNomProc = this.ActualizarAProceso.getRawValue()['nuevoNomProc'];
    var textDescProc = this.ActualizarAProceso.getRawValue()['nuevoDescProc'];
    var textIdTipProceso = this.ActualizarAProceso.getRawValue()['nuevoTipProc'];
    var textIdProdu= this.ActualizarAProceso.getRawValue()['nuevoIdProd'];
    var cadena = {"id_proceso":textIdProc,"nombre_proceso":textNomProc,"descipcion_proceso":textDescProc,
    "id_tipo_proceso":textIdTipProceso, "id_producto":textIdProdu};
    this.servi.updateProceso(cadena).then
      (
        res => {
          console.log("res",res)
        }
      ).catch(err => {
        console.log(err)
      })
  }

  //=============================================================
  //LAS FUNCIONES PARA LLAMARLAS DESDE EL HTML
  //=============================================================
  ngOnInit() {
  
    this.filtrarProceso = this.formBuilder.group(
    {
      textfiltro: []
    });
    this.formBuilder.group

    this.InsertarGProceso = this.formBuilder.group(
    {
      textNomProc: [],
      textDescProc: [],
      textIdTipProc: [],
      textIdProducto: []
    });
    this.formBuilder.group

    this.ActualizarAProceso = this.formBuilder.group(
    {
      ActualizarIdProceso: [],
      nuevoNomProc: [],
      nuevoDescProc: [],
      nuevoTipProc: [],
      nuevoIdProd: []
    });
    this.formBuilder.group
  }
}