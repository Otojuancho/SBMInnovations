import { Component, OnInit } from '@angular/core';
import { SBMServicioService } from '../sbmservicio.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  title = "MANEJO DE PRODUCTOS";

  Productos: any = [];
  MiProducto: any = [];
  MiProductoE: any = [];
  MiProductoA: any = [];

  filtrarProducto: FormGroup;
  InsertarGProducto: FormGroup;
  ActualizarAProducto: FormGroup;

  tituloProductos = "";
  tituloProducto = "";
  tituloProductoEditar = "";

  constructor(
      private formBuilder: FormBuilder,
      private servi: SBMServicioService,
      Router: Router) { }

  //=============================================================
  //LOS CRUL
  //=============================================================

  consultaProductos() {
    this.servi.getProductos().subscribe((data: {producto: []}) => {this.Productos = data;}, error => {console.error(error + " ")});
    this.tituloProductos = "Lista de Productos";
  }

  //--------------------------------------------------------------

  public buscarProductos(id) {
    var filtovalor = this.filtrarProducto.getRawValue()['textfiltro'];
    this.servi.getProducto('/' + filtovalor).subscribe((data: {}) => {this.MiProducto = data;}, error => {console.log(error)});
    this.tituloProducto="";
  }

  //--------------------------------------------------------------

  public InsertarProducto() {
    var datosvalo2 = this.InsertarGProducto.getRawValue()['textNomProducto'];
    var datosvalo3 = this.InsertarGProducto.getRawValue()['textIdTipProd'];
    var cadena = {"nombre_producto":datosvalo2,"id_tipo_producto":datosvalo3};
    this.servi.insertProducto(cadena).then(res => {console.log(res)}).catch(err =>
      {console.log(err)});
  }

  //--------------------------------------------------------------

  buscarEditarProducto(id) {
    var filtoEvalor = this.ActualizarAProducto.getRawValue()['ActualizarIdProducto'];
    this.servi.getProducto('/' + filtoEvalor).subscribe((data: {}) => {
      this.MiProductoE = data;
    }, error => { console.log(error) });
    this.tituloProductoEditar = "Producto a Editar";
  }
  
  //--------------------------------------------------------------

  public ActualizarProducto() {
    console.log("Actualiza producto asdsadasdsa")
    var textIdProducto = this.ActualizarAProducto.getRawValue()['ActualizarIdProducto'];
    var textNomProducto = this.ActualizarAProducto.getRawValue()['nuevoNomProd'];
    var textIdTipProd = this.ActualizarAProducto.getRawValue()['nuevoIdTipProd'];
    var cadena = {"id_producto":textIdProducto,"nombre_producto":textNomProducto,"id_tipo_producto":textIdTipProd};
    this.servi.updateProducto(cadena).then
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

    this.filtrarProducto = this.formBuilder.group(
    {
      textfiltro: []
    });
    this.formBuilder.group

    this.InsertarGProducto = this.formBuilder.group(
    {
      textNomProducto: [],
      textIdTipProd: [],
    });
    this.formBuilder.group

    this.ActualizarAProducto = this.formBuilder.group(
    {
      ActualizarIdProducto: [],
      nuevoNomProd: [],
      nuevoIdTipProd: []
    });
    this.formBuilder.group
  }
}