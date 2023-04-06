import { Component, OnInit } from '@angular/core';
import { SBMServicioService } from '../sbmservicio.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  title = "MANEJO DE EMPLEADOS";

  Empleados: any = [];
  MiEmpleado: any = [];
  MiEmpleadoE: any = [];
  MiEmpleadoA: any = [];

  filtrarEmpleado: FormGroup;
  InsertarGEmpleado: FormGroup;
  ActualizarAEmpleado: FormGroup;

  tituloEmpleados = "";
  tituloEmpleado = "";
  tituloEmpleadoEditar = "";

  constructor(
      private formBuilder: FormBuilder,
      private servi: SBMServicioService,
      Router: Router) { }

  //=============================================================
  //LOS CRUL
  //=============================================================

  consultaEmpleados() {
    this.servi.getEmpleados().subscribe((data: {empleado: []}) => {this.Empleados = data;}, error => {console.error(error + " ")});
    this.tituloEmpleados = "";
  }

  //--------------------------------------------------------------

  public buscarEmpleados(id) {
    var filtovalor = this.filtrarEmpleado.getRawValue()['textfiltro'];
    this.servi.getEmpleado('/' + filtovalor).subscribe((data: {}) => {this.MiEmpleado = data;}, error => {console.log(error)});
    this.tituloEmpleado ="";
  }

  //--------------------------------------------------------------

  public InsertarEmpleado() {
    var datosvalo2 = this.InsertarGEmpleado.getRawValue()['textDocEmpleado'];
    var datosvalo3 = this.InsertarGEmpleado.getRawValue()['textNom1Empleado'];
    var datosvalo4 = this.InsertarGEmpleado.getRawValue()['textNom2Empleado'];
    var datosvalo5 = this.InsertarGEmpleado.getRawValue()['textApe1Empleado'];
    var datosvalo6 = this.InsertarGEmpleado.getRawValue()['textApe2Empleado'];
    var datosvalo7 = this.InsertarGEmpleado.getRawValue()['textNaciEmpleado'];
    var datosvalo8 = this.InsertarGEmpleado.getRawValue()['textSexEmpleado'];
    var datosvalo9 = this.InsertarGEmpleado.getRawValue()['textVigEmpleado'];
    var datosvalo10 = this.InsertarGEmpleado.getRawValue()['textRolEmpleado'];
    var datosvalo11 = this.InsertarGEmpleado.getRawValue()['textTdocEmpleado'];
    var cadena = {"num_doc_empleado":datosvalo2,"nombre1_empleado":datosvalo3,"nombre2_empleado":datosvalo4,
    "apellido1_empleado":datosvalo5, "apellido2_empleado":datosvalo6,"fecha_naci_empleado":datosvalo7,
    "sexo_empleado":datosvalo8,"vigencia_empleado":datosvalo9,"rol_empleado":datosvalo10,"id_tip_doc":datosvalo11};
    this.servi.insertEmpleado(cadena).then(res => {console.log(res)}).catch(err =>
      {console.log(err)});
  }

  //--------------------------------------------------------------

  buscarEditarEmpleado(id) {
    var filtoEvalor = this.ActualizarAEmpleado.getRawValue()['ActualizarDocEmpleado'];
    this.servi.getEmpleado('/' + filtoEvalor).subscribe((data: {}) => {
      this.MiEmpleadoE = data;
    }, error => { console.log(error) });
    this.tituloEmpleadoEditar = "";
  }

  //--------------------------------------------------------------

  public ActualizarEmpleado() {
    console.log("Actualiza tipprod asdsadasdsa")
    var textDocEmpleado = this.ActualizarAEmpleado.getRawValue()['ActualizarDocEmpleado'];
    var textNom1Empleado = this.ActualizarAEmpleado.getRawValue()['nuevoNom1'];
    var textNom2Empleado = this.ActualizarAEmpleado.getRawValue()['nuevoNom2'];
    var textApe1Empleado = this.ActualizarAEmpleado.getRawValue()['nuevoApe1'];
    var textApe2Empleado = this.ActualizarAEmpleado.getRawValue()['nuevoApe2'];
    var textNaciEmpleado = this.ActualizarAEmpleado.getRawValue()['nuevoNaci'];
    var textSexEmpleado = this.ActualizarAEmpleado.getRawValue()['nuevoSex'];
    var textVigEmpleado = this.ActualizarAEmpleado.getRawValue()['nuevoVig'];
    var textRolEmpleado = this.ActualizarAEmpleado.getRawValue()['nuevoRol'];
    var textTdocEmpleado = this.ActualizarAEmpleado.getRawValue()['nuevoTdoc'];
    var cadena = {"num_doc_empleado":textDocEmpleado,"nombre1_empleado":textNom1Empleado,"nombre2_empleado":textNom2Empleado,
    "apellido1_empleado":textApe1Empleado, "apellido2_empleado":textApe2Empleado,"fecha_naci_empleado":textNaciEmpleado,
    "sexo_empleado":textSexEmpleado,"vigencia_empleado":textVigEmpleado,"rol_empleado":textRolEmpleado,"id_tip_doc":textTdocEmpleado};
    this.servi.updateEmpleado(cadena).then
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

    this.filtrarEmpleado = this.formBuilder.group(
    {
      textfiltro: []
    });
    this.formBuilder.group

    this.InsertarGEmpleado = this.formBuilder.group(
    {
      textDocEmpleado: [],
      textNom1Empleado: [],
      textNom2Empleado: [],
      textApe1Empleado: [],
      textApe2Empleado: [],
      textNaciEmpleado: [],
      textSexEmpleado: [],
      textVigEmpleado: [],
      textRolEmpleado: [],
      textTdocEmpleado: []
    });
    this.formBuilder.group

    this.ActualizarAEmpleado = this.formBuilder.group(
    {
      ActualizarDocEmpleado: [],
      nuevoNom1: [],
      nuevoNom2: [],
      nuevoApe1: [],
      nuevoApe2: [],
      nuevoNaci: [],
      nuevoSex: [],
      nuevoVig: [],
      nuevoRol: [],
      nuevoTdoc: []
    });
    this.formBuilder.group
  }
}