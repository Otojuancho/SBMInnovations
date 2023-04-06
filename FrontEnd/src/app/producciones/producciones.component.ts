import { Component, OnInit } from '@angular/core';
import { SBMServicioService } from '../sbmservicio.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-producciones',
  templateUrl: './producciones.component.html',
  styleUrls: ['./producciones.component.css']
})
export class ProduccionesComponent implements OnInit {

  title = "MANEJO DE PRODUCCIONES";

  Producciones: any = [];
  MiProduccion: any = [];
  MiProduccionE: any = [];
  MiProduccionA: any = [];

  filtrarProduccion: FormGroup;
  InsertarGProduccion: FormGroup;
  ActualizarAProduccion: FormGroup;

  tituloProducciones = "";
  tituloProduccion = "";
  tituloProduccionEditar = "";

  constructor(
      private formBuilder: FormBuilder,
      private servi: SBMServicioService,
      Router: Router) { }

  //=============================================================
  //LOS CRUL
  //=============================================================

  consultaProducciones() {
    this.servi.getProducciones().subscribe((data: {produccion: []}) => {this.Producciones = data;}, error => {console.error(error + " ")});
    this.tituloProducciones = "";
  }

  //--------------------------------------------------------------

  public buscarProducciones(id) {
    var filtovalor = this.filtrarProduccion.getRawValue()['textfiltro'];
    this.servi.getProduccion('/' + filtovalor).subscribe((data: {}) => {this.MiProduccion = data;}, error => {console.log(error)});
    this.tituloProduccion="";
  }

  //--------------------------------------------------------------

  public InsertarProduccion() {
    var datosvalo2 = this.InsertarGProduccion.getRawValue()['textProdProd'];
    var datosvalo3 = this.InsertarGProduccion.getRawValue()['textFechReg'];
    var datosvalo4 = this.InsertarGProduccion.getRawValue()['textIdEmpleado'];
    var cadena = {"producto_produccion":datosvalo2,"fecha_registro":datosvalo3,"id_empleado":datosvalo4};
    this.servi.insertProduccion(cadena).then(res => {console.log(res)}).catch(err =>
      {console.log(err)});
  }

  //--------------------------------------------------------------

  buscarEditarProduccion(id) {
    var filtoEvalor = this.ActualizarAProduccion.getRawValue()['ActualizarIdProduccion'];
    this.servi.getProduccion('/' + filtoEvalor).subscribe((data: {}) => {
      this.MiProduccionE = data;
    }, error => { console.log(error) });
    this.tituloProduccionEditar = "";
  }
  
  //--------------------------------------------------------------

  public ActualizarProduccion() {
    console.log("Actualiza produccion asdsadasdsa")
    var textIdProduccion = this.ActualizarAProduccion.getRawValue()['ActualizarIdProduccion'];
    var textProdProduccion = this.ActualizarAProduccion.getRawValue()['nuevoProdProd'];
    var textFechReg = this.ActualizarAProduccion.getRawValue()['nuevoFechReg'];
    var textIdEmpleado = this.ActualizarAProduccion.getRawValue()['nuevoIdEmp'];
    var cadena = {"id_produccion":textIdProduccion,"producto_produccion":textProdProduccion,"fecha_registro":textFechReg,"id_empleado":textIdEmpleado};;
    this.servi.updateProduccion(cadena).then
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

    this.filtrarProduccion = this.formBuilder.group(
    {
      textfiltro: []
    });
    this.formBuilder.group

    this.InsertarGProduccion = this.formBuilder.group(
    {
      textProdProd: [],
      textFechReg: [],
      textIdEmpleado: []
    });
    this.formBuilder.group

    this.ActualizarAProduccion = this.formBuilder.group(
    {
      ActualizarIdProduccion: [],
      nuevoProdProd: [],
      nuevoFechReg: [],
      nuevoIdEmp: []
    });
    this.formBuilder.group
  }
}