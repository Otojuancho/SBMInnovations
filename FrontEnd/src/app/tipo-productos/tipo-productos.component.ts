import { Component, OnInit } from '@angular/core';
import { SBMServicioService } from '../sbmservicio.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-tipo-productos',
  templateUrl: './tipo-productos.component.html',
  styleUrls: ['./tipo-productos.component.css']
})
export class TipoProductosComponent implements OnInit {

  title = "MANEJO DE TIPOS DE PRODUCTOS";

  TipProdus: any = [];
  MiTipProdu: any = [];
  MiTipProduE: any = [];
  MiTipProduA: any = [];

  filtrarTipProdu: FormGroup;
  InsertarGTipProdu: FormGroup;
  ActualizarATipProdu: FormGroup;

  tituloTipProdus = "";
  tituloTipProdu = "";
  tituloTipProduEditar = "";

  constructor(
      private formBuilder: FormBuilder,
      private servi: SBMServicioService,
      Router: Router) { }

  //=============================================================
  //LOS CRUL
  //=============================================================

  consultaTipProdus() {
    this.servi.getTipProdus().subscribe((data: {tipprod: []}) => {this.TipProdus = data;}, error => {console.error(error + " ")});
    this.tituloTipProdus = "";
  }

  //--------------------------------------------------------------

  public buscarTipProdus(id) {
    var filtovalor = this.filtrarTipProdu.getRawValue()['textfiltro'];
    this.servi.getTipProdu('/' + filtovalor).subscribe((data: {}) => {this.MiTipProdu = data;}, error => {console.log(error)});
    this.tituloTipProdu ="";
  }

  //--------------------------------------------------------------

  public InsertarTipProdu() {
    var datosvalo2 = this.InsertarGTipProdu.getRawValue()['textTipProd'];
    var datosvalo3 = this.InsertarGTipProdu.getRawValue()['textiniTipProd'];
    var cadena = {"tipo_producto":datosvalo2,"inicial_tipo_prod":datosvalo3};
    this.servi.insertTipProdu(cadena).then(res => {console.log(res)}).catch(err =>
      {console.log(err)});
  }

  //--------------------------------------------------------------

  buscarEditarTipProdu(id) {
    var filtoEvalor = this.ActualizarATipProdu.getRawValue()['ActualizarIdTipProd'];
    this.servi.getTipProdu('/' + filtoEvalor).subscribe((data: {}) => {
      this.MiTipProduE = data;
    }, error => { console.log(error) });
    this.tituloTipProduEditar = "";
  }

  //--------------------------------------------------------------

  public ActualizarTipProd() {
    console.log("Actualiza tipprod asdsadasdsa")
    var textIdTipProd = this.ActualizarATipProdu.getRawValue()['ActualizarIdTipProd'];
    var textTipProd = this.ActualizarATipProdu.getRawValue()['nuevoTipProd'];
    var textIniTipProd = this.ActualizarATipProdu.getRawValue()['nuevoIniTipProd'];
    var cadena = { "id_tipo_producto": textIdTipProd,"tipo_producto": textTipProd, "inicial_tipo_prod" : textIniTipProd};
    this.servi.updateTipProdu(cadena).then
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

    this.filtrarTipProdu = this.formBuilder.group(
    {
      textfiltro: []
    });
    this.formBuilder.group

    this.InsertarGTipProdu = this.formBuilder.group(
    {
      textTipProd: [],
      textiniTipProd: []
    });
    this.formBuilder.group

    this.ActualizarATipProdu = this.formBuilder.group(
    {
      ActualizarIdTipProd: [],
      nuevoTipProd: [],
      nuevoIniTipProd: []
    });
    this.formBuilder.group
  }
}