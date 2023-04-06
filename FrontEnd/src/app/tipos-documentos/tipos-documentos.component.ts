import { Component, OnInit } from '@angular/core';
import { SBMServicioService } from '../sbmservicio.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-tipos-documentos',
  templateUrl: './tipos-documentos.component.html',
  styleUrls: ['./tipos-documentos.component.css']
})
export class TiposDocumentosComponent implements OnInit {

  title = "MANEJO DE TIPOS DE DOCUMENTOS";

  TipDocs: any = [];
  MiTipDoc: any = [];
  MiTipDocE: any = [];
  MiTipDocA: any = [];

  filtrarTipDoc: FormGroup;
  InsertarGTipDoc: FormGroup;
  ActualizarATipDoc: FormGroup;

  tituloTipDocs = "";
  tituloTipDoc = "";
  tituloTipDocEditar = "";

  constructor(
      private formBuilder: FormBuilder,
      private servi: SBMServicioService,
      Router: Router) { }

  //=============================================================
  //LOS CRUL
  //=============================================================

  consultaTipDocs() {
    this.servi.getTipDocs().subscribe((data: {tipdoc: []}) => {this.TipDocs = data;}, error => {console.error(error + " ")});
    this.tituloTipDocs = "";
  }

  //--------------------------------------------------------------

  public buscarTipDocs(id) {
    var filtovalor = this.filtrarTipDoc.getRawValue()['textfiltro'];
    this.servi.getTipDoc('/' + filtovalor).subscribe((data: {}) => {this.MiTipDoc = data;}, error => {console.log(error)});
    this.tituloTipDoc = "";
  }

  //--------------------------------------------------------------

  public InsertarTipDoc() {
    var datosvalo2 = this.InsertarGTipDoc.getRawValue()['textTipDoc'];
    var datosvalo3 = this.InsertarGTipDoc.getRawValue()['textiniTipDoc'];
    var cadena = {"tipo_documento":datosvalo2,"inicial_tipo_doc":datosvalo3};
    this.servi.insertTipDoc(cadena).then(res => {console.log(res)}).catch(err =>
      {console.log(err)});
  }

  //--------------------------------------------------------------

  buscarEditarTipDoc(id) {
    var filtoEvalor = this.ActualizarATipDoc.getRawValue()['ActualizarIdipDoc'];
    this.servi.getTipDoc('/' + filtoEvalor).subscribe((data: {}) => {
      this.MiTipDocE = data;
    }, error => { console.log(error) });
    this.tituloTipDocEditar = "";
  }

  //--------------------------------------------------------------

  public ActualizarTipDoc() {
    console.log("Actualiza tipdoc asdsadasdsa")
    var textIdTipDoc = this.ActualizarATipDoc.getRawValue()['ActualizarIdipDoc'];
    var nuevoTipDoc = this.ActualizarATipDoc.getRawValue()['nuevoTipDoc'];
    var nuevoIniTipDoc = this.ActualizarATipDoc.getRawValue()['nuevoIniTipDoc'];
    var cadena = { "id_tip_doc": textIdTipDoc,"tipo_documento":nuevoTipDoc, "inicial_tipo_doc" : nuevoIniTipDoc};
    this.servi.updateTipDoc(cadena).then
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

    this.filtrarTipDoc = this.formBuilder.group(
    {
      textfiltro: []
    });
    this.formBuilder.group

    this.InsertarGTipDoc = this.formBuilder.group(
    {
      textTipDoc: [],
      textiniTipDoc: []
    });
    this.formBuilder.group

    this.ActualizarATipDoc = this.formBuilder.group(
    {
      ActualizarIdipDoc: [],
      nuevoTipDoc: [],
      nuevoIniTipDoc: []
    });
    this.formBuilder.group
  }
}