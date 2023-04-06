//Librerias a importar
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

//para el manejo y estilo de los Json
const httpOptions =
{
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable(
  {
    providedIn: 'root'
  })

//exporta el servicio
export class SBMServicioService {

  //dirección del servicio en el Back-End BE
  private Url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  //Método para extraer los datos del servicio BE
  private extractData(res: Response) {
    let body = res;
    return body || {};
    ;
  }

  //manejador de los errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T)
    };
  }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// TODOS LOS CRUL DE TODAS LAS CLASES DEL PROYECTO
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //=============================================================
  // SERVICIO CRUL DE EMPLEADOS
  //=============================================================

  //Mismos nombres de los metodos en la clase rutas del BE
  //Método listar de los empleados
  getEmpleados(): Observable<any> {
    return this.http.get(this.Url + "/empleados", httpOptions).pipe(
      map(this.extractData)
    );
  }

  //-------------------------------------------------------------
  //Método mostrar un solo empleado
  getEmpleado(id): Observable<any> {
    return this.http.get(this.Url + "/empleados" + id, httpOptions).pipe(
      map(this.extractData));
  }

  //-------------------------------------------------------------
  //Método para insertar un nuevo empleado
  async insertEmpleado(Empleados): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/empleados", Empleados, httpOptions).toPromise()
    });
  }

  //-------------------------------------------------------------
  //Método para modificar un empleado
  async updateEmpleado(cadena): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/empleados", cadena, httpOptions).toPromise()
    });
  }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// SE CONTINUA CON LOS CRUL DE OTRA CLASE
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //=============================================================
  // SERVICIO CRUL DE INSUMOS
  //=============================================================

  //Mismos nombres de los metodos en la clase rutas del BE
  //Método listar de los insumos
  getInsumos(): Observable<any> {
    return this.http.get(this.Url + "/insumos", httpOptions).pipe(
      map(this.extractData)
    );
  }

  //-------------------------------------------------------------
  //Método mostrar un solo insumo
  getInsumo(id): Observable<any> {
    return this.http.get(this.Url + "/insumos" + id, httpOptions).pipe(
      map(this.extractData));
  }

  //-------------------------------------------------------------
  //Método para insertar un nuevo insumo
  async insertInsumo(Insumos): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/insumos", Insumos, httpOptions).toPromise()
    });
  }

  //-------------------------------------------------------------
  //Método para modificar un insumo
  async updateInsumo(cadena): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/Insumos", cadena, httpOptions).toPromise()
    });
  }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// SE CONTINUA CON LOS CRUL DE OTRA CLASE
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //=============================================================
  // SERVICIO CRUL DE PROCESOS
  //=============================================================

  //Mismos nombres de los metodos en la clase rutas del BE
  //Método listar de los procesos
  getProcesos(): Observable<any> {
    return this.http.get(this.Url + "/procesos", httpOptions).pipe(
      map(this.extractData)
    );
  }

  //-------------------------------------------------------------
  //Método mostrar un solo proceso
  getProceso(id): Observable<any> {
    return this.http.get(this.Url + "/procesos" + id, httpOptions).pipe(
      map(this.extractData));
  }

  //-------------------------------------------------------------
  //Método para insertar un nuevo proceso
  async insertProceso(TipIns): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/procesos", TipIns, httpOptions).toPromise()
    });
  }

  //-------------------------------------------------------------
  //Método para modificar un proceso
  async updateProceso(cadena): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/procesos", cadena, httpOptions).toPromise()
    });
  }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// SE CONTINUA CON LOS CRUL DE OTRA CLASE
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //=============================================================
  // SERVICIO CRUL DE PRODUCCIONES
  //=============================================================

  //Mismos nombres de los metodos en la clase rutas del BE
  //Método listar de las producciones
  getProducciones(): Observable<any> {
    return this.http.get(this.Url + "/producciones", httpOptions).pipe(
      map(this.extractData)
    );
  }

  //-------------------------------------------------------------
  //Método mostrar una sola produccion
  getProduccion(id): Observable<any> {
    return this.http.get(this.Url + "/producciones" + id, httpOptions).pipe(
      map(this.extractData));
  }

  //-------------------------------------------------------------
  //Método para insertar una nueva produccion
  async insertProduccion(Producciones): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/producciones", Producciones, httpOptions).toPromise()
    });
  }

  //-------------------------------------------------------------
  //Método para modificar una produccion
  async updateProduccion(cadena): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/producciones", cadena, httpOptions).toPromise()
    });
  }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// SE CONTINUA CON LOS CRUL DE OTRA CLASE
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //=============================================================
  // SERVICIO CRUL DE PRODUCTOS
  //=============================================================

  //Mismos nombres de los metodos en la clase rutas del BE
  //Método listar de los productos
  getProductos(): Observable<any> {
    return this.http.get(this.Url + "/productos", httpOptions).pipe(
      map(this.extractData)
    );
  }

  //-------------------------------------------------------------
  //Método mostrar un solo producto
  getProducto(id): Observable<any> {
    return this.http.get(this.Url + "/productos" + id, httpOptions).pipe(
      map(this.extractData));
  }

  //-------------------------------------------------------------
  //Método para insertar un nuevo producto
  async insertProducto(Producto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/productos", Producto, httpOptions).toPromise()
    });
  }

  //-------------------------------------------------------------
  //Método para modificar un producto
  async updateProducto(cadena): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/productos", cadena, httpOptions).toPromise()
    });
  }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// SE CONTINUA CON LOS CRUL DE OTRA CLASE
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //=============================================================
  // SERVICIO CRUL DE TIPOS DE DOCUMENTOS
  //=============================================================

  //Mismos nombres de los metodos en la clase rutas del BE
  // Método listar de los tipos de documentos
  getTipDocs(): Observable<any> {
    return this.http.get(this.Url + "/tipdoc", httpOptions).pipe(
      map(this.extractData)
    );
  }

  //-------------------------------------------------------------
  //Método mostrar un solo tipo de documento
  getTipDoc(id): Observable<any> {
    return this.http.get(this.Url + "/tipdoc" + id, httpOptions).pipe(
      map(this.extractData));
  }

  //-------------------------------------------------------------
  //Método para insertar un nuevo tipo de documento
  async insertTipDoc(TipoDocumento): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/tipdoc", TipoDocumento, httpOptions).toPromise()
    });
  }

  //-------------------------------------------------------------
  //Método para modificar un tipo de documento
  async updateTipDoc(cadena): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/tipdoc", cadena, httpOptions).toPromise()
    });
  }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// SE CONTINUA CON LOS CRUL DE OTRA CLASE
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //=============================================================
  // SERVICIO CRUL DE TIPOS DE INSUMOS
  //=============================================================

  //Mismos nombres de los metodos en la clase rutas del BE
  //Método listar de los tipos de insumos
  getTipInsus(): Observable<any> {
    return this.http.get(this.Url + "/tipinsu", httpOptions).pipe(
      map(this.extractData)
    );
  }

  //-------------------------------------------------------------
  //Método mostrar un solo tipo de insumo
  getTipInsu(id): Observable<any> {
    return this.http.get(this.Url + "/tipinsu" + id, httpOptions).pipe(
      map(this.extractData));
  }

  //-------------------------------------------------------------
  //Método para insertar un nuevo tipo de insumo
  async insertTipInsu(TipoInsumo): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/tipinsu", TipoInsumo, httpOptions).toPromise()
    });
  }

  //-------------------------------------------------------------
  //Método para modificar un tipo de insumo
  async updateTipInsu(cadena): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/tipinsu", cadena, httpOptions).toPromise()
    });
  }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// SE CONTINUA CON LOS CRUL DE OTRA CLASE
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //=============================================================
  // SERVICIO CRUL DE TIPOS DE PRODUCTOS
  //=============================================================

  //Mismos nombres de los metodos en la clase rutas del BE
  //Método Listar de los tipos de productos
  getTipProdus(): Observable<any> {
    return this.http.get(this.Url + "/tipprodu", httpOptions).pipe(
      map(this.extractData)
    );
  }

  //-------------------------------------------------------------
  //Método mostrar un solo tipo de producto
  getTipProdu(id): Observable<any> {
    return this.http.get(this.Url + "/tipprodu" + id, httpOptions).pipe(
      map(this.extractData));
  }

  //-------------------------------------------------------------
  //Método para insertar un nuevo tipo de producto
  async insertTipProdu(TipoProducto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/tipprodu", TipoProducto, httpOptions).toPromise()
    });
  }

  //-------------------------------------------------------------
  //Método para modificar un tipo de producto
  async updateTipProdu(cadena): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/tipprodu", cadena, httpOptions).toPromise()
    });
  }
}