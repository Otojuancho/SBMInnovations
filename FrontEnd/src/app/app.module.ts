import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { HttpModule, } from '@angular/http';
import { HttpClientModule, } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppComponent } from '../app/appComponent/app.component';
import { TiposDocumentosComponent } from './tipos-documentos/tipos-documentos.component';
import { TipoInsumosComponent } from './tipo-insumos/tipo-insumos.component';
import { TipoProcesosComponent } from './tipo-procesos/tipo-procesos.component';
import { TipoProductosComponent } from './tipo-productos/tipo-productos.component';
import { TelefonosComponent } from './telefonos/telefonos.component';
import { RolesComponent } from './roles/roles.component';
import { ProductosComponent } from './productos/productos.component';
import { ProduccionesComponent } from './producciones/producciones.component';
import { ProcesosComponent } from './procesos/procesos.component';
import { InsumosComponent } from './insumos/insumos.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';

import {SBMServicioService } from './sbmservicio.service';

//..................................................................................
//se establecen las rutas a los componentes
const appRoutes: Routes = 
[
    {
      path: '',
      pathMatch: 'prefix',
      redirectTo: 'Inicio',
    },

    {
      path: 'Inicio',
      component: PaginaInicialComponent,
    },

    {
      path: 'tipdoc',
      component: TiposDocumentosComponent,
    },

    {
      path: 'empleados',
      component: EmpleadosComponent,
    },

    {
      path: 'insumos',
      component: InsumosComponent,
    },

    {
      path: 'procesos',
      component: ProcesosComponent,
    },

    {
      path: 'producciones',
      component: ProduccionesComponent,
    },

    {
      path: 'productos',
      component: ProductosComponent,
    },

    {
      path: 'roles',
      component: RolesComponent,
    },

    {
      path: 'telefonos',
      component: TelefonosComponent,
    },

    {
      path: 'tipinsu',
      component: TipoInsumosComponent,
    },

    {
      path: 'tipproc',
      component: TipoProcesosComponent,
    },

    {
      path: 'tipprodu',
      component: TipoProductosComponent,
    },

  ];

//.........................................................................
//declaracion de los componentes y módulos
//y se importan los elementos a utilizar

@NgModule({
  declarations: [
    AppComponent,
    TiposDocumentosComponent,
    TipoInsumosComponent,
    TipoProcesosComponent,
    TipoProductosComponent,
    TelefonosComponent,
    RolesComponent,
    ProductosComponent,
    ProduccionesComponent,
    ProcesosComponent,
    InsumosComponent,
    EmpleadosComponent,
    PaginaInicialComponent
  ],
  imports:
  [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    RouterModule.forRoot(appRoutes), // se agregan estos
    BrowserModule,
    HttpClientModule  // <- Agregar la clase
  ],

  providers: [SBMServicioService],
  bootstrap: [AppComponent]
})
export class AppModule { }