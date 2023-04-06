import { Component, OnInit } from '@angular/core';
import { SBMServicioService } from '../sbmservicio.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-tipo-insumos',
  templateUrl: './tipo-insumos.component.html',
  styleUrls: ['./tipo-insumos.component.css']
})
export class TipoInsumosComponent implements OnInit {

  title = "MANEJO DE TIPOS DE INSUMOS";

  TipInsus: any = [];
  MiTipInsu: any = [];
  MiTipInsuE: any = [];
  MiTipInsuA: any = [];

  filtrarTipInsu: FormGroup;
  InsertarGTipInsu: FormGroup;
  ActualizarATipInsu: FormGroup;

  tituloTipInsus = "";
  tituloTipInsu = "";
  tituloTipInsuEditar = "";

  constructor(
      private formBuilder: FormBuilder,
      private servi: SBMServicioService,
      Router: Router) { }

  //=============================================================
  //LOS CRUL
  //=============================================================

  consultaTipInsus() {
    this.servi.getTipInsus().subscribe((data: {tipinsu: []}) => {this.TipInsus = data;}, error => {console.error(error + " ")});
    this.tituloTipInsus = "";
  }

  //--------------------------------------------------------------

  public buscarTipInsus(id) {
    var filtovalor = this.filtrarTipInsu.getRawValue()['textfiltro'];
    this.servi.getTipInsu('/' + filtovalor).subscribe((data: {}) => {this.MiTipInsu = data;}, error => {console.log(error)});
    this.tituloTipInsu = "";
  }

  //--------------------------------------------------------------

  public InsertarTipInsu() {
    var datosvalo2 = this.InsertarGTipInsu.getRawValue()['textTipIns'];
    var datosvalo3 = this.InsertarGTipInsu.getRawValue()['textiniTipIns'];
    var cadena = {"tipo_insumo":datosvalo2,"inicial_tipo_insumo":datosvalo3};
    this.servi.insertTipInsu(cadena).then(res => {console.log(res)}).catch(err =>
      {console.log(err)});
  }

  //--------------------------------------------------------------

  buscarEditarTipInsu(id) {
    var filtoEvalor = this.ActualizarATipInsu.getRawValue()['ActualizarIdTipIns'];
    this.servi.getTipInsu('/' + filtoEvalor).subscribe((data: {}) => {
      this.MiTipInsuE = data;
    }, error => { console.log(error) });
    this.tituloTipInsuEditar = "";
  }

  //--------------------------------------------------------------

  public ActualizarTipIns() {
    console.log("Actualiza tipins asdsadasdsa")
    var textIdTipIns = this.ActualizarATipInsu.getRawValue()['ActualizarIdTipIns'];
    var textTipIns = this.ActualizarATipInsu.getRawValue()['nuevoTipIns'];
    var textIniTipIns = this.ActualizarATipInsu.getRawValue()['nuevoIniTipIns'];
    var cadena = { "id_tipo_insumo": textIdTipIns,"tipo_insumo": textTipIns, "inicial_tipo_insumo" : textIniTipIns};
    this.servi.updateTipInsu(cadena).then
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

    this.filtrarTipInsu = this.formBuilder.group(
    {
      textfiltro: []
    });
    this.formBuilder.group

    this.InsertarGTipInsu = this.formBuilder.group(
    {
      textTipIns: [],
      textiniTipIns: []
    });
    this.formBuilder.group

    this.ActualizarATipInsu = this.formBuilder.group(
    {
      ActualizarIdTipIns: [],
      nuevoTipIns: [],
      nuevoIniTipIns: []
    });
    this.formBuilder.group
  }
}