import { Component, OnInit } from '@angular/core';
import { SBMServicioService } from '../sbmservicio.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class InsumosComponent implements OnInit {

  title = "MANEJO DE INSUMOS";

  Insumos: any = [];
  MiInsumo: any = [];
  MiInsumoE: any = [];
  MiInsumoA: any = [];

  filtrarInsumo: FormGroup;
  InsertarGInsumo: FormGroup;
  ActualizarAInsumo: FormGroup;

  tituloInsumos = "";
  tituloInsumo = "";
  tituloInsumoEditar = "";

  constructor(
      private formBuilder: FormBuilder,
      private servi: SBMServicioService,
      Router: Router) { }

  //=============================================================
  //LOS CRUL
  //=============================================================

  consultaInsumos() {
    this.servi.getInsumos().subscribe((data: {insumo: []}) => {this.Insumos = data;}, error => {console.error(error + " ")});
    this.tituloInsumos = "";
  }

  //--------------------------------------------------------------

  public buscarInsumos(id) {
    var filtovalor = this.filtrarInsumo.getRawValue()['textfiltro'];
    this.servi.getInsumo('/' + filtovalor).subscribe((data: {}) => {this.MiInsumo = data;}, error => {console.log(error)});
    this.tituloInsumo ="";
  }

  //--------------------------------------------------------------

  public InsertarInsumo() {
    var datosvalo2 = this.InsertarGInsumo.getRawValue()['textNomIns'];
    var datosvalo3 = this.InsertarGInsumo.getRawValue()['textDescIns'];
    var datosvalo4 = this.InsertarGInsumo.getRawValue()['textIdTipIns'];
    var datosvalo5 = this.InsertarGInsumo.getRawValue()['textIdProducto'];
    var cadena = {"nombre_insumo":datosvalo2,"descripcion_insumo":datosvalo3,"id_tipo_insumo":datosvalo4,
    "id_producto":datosvalo5};
    this.servi.insertInsumo(cadena).then(res => {console.log(res)}).catch(err =>
      {console.log(err)});
  }

  //--------------------------------------------------------------

  buscarEditarInsumo(id) {
    var filtoEvalor = this.ActualizarAInsumo.getRawValue()['ActualizarIdInsumo'];
    this.servi.getInsumo('/' + filtoEvalor).subscribe((data: {}) => {
      this.MiInsumoE = data;
    }, error => { console.log(error) });
    this.tituloInsumoEditar = "";
  }

  //--------------------------------------------------------------

  public ActualizarInsumo() {
    console.log("Actualiza tipprod asdsadasdsa")
    var textIdInsumo = this.ActualizarAInsumo.getRawValue()['ActualizarIdInsumo'];
    var textNomIns = this.ActualizarAInsumo.getRawValue()['nuevoNomIns'];
    var textDescIns = this.ActualizarAInsumo.getRawValue()['nuevoDescIns'];
    var textIdTipIns = this.ActualizarAInsumo.getRawValue()['nuevoTipIns'];
    var textIdProdu= this.ActualizarAInsumo.getRawValue()['nuevoIdProd'];
    var cadena = {"id_insumo":textIdInsumo,"nombre_insumo":textNomIns,"descripcion_insumo":textDescIns,
    "id_tipo_insumo":textIdTipIns, "id_producto":textIdProdu};
    this.servi.updateInsumo(cadena).then
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

    this.filtrarInsumo = this.formBuilder.group(
    {
      textfiltro: []
    });
    this.formBuilder.group

    this.InsertarGInsumo = this.formBuilder.group(
    {
      textNomIns: [],
      textDescIns: [],
      textIdTipIns: [],
      textIdProducto: []
    });
    this.formBuilder.group

    this.ActualizarAInsumo = this.formBuilder.group(
    {
      ActualizarIdInsumo: [],
      nuevoNomIns: [],
      nuevoDescIns: [],
      nuevoTipIns: [],
      nuevoIdProd: []
    });
    this.formBuilder.group
  }
}