import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { HttpXsrfCookieExtractor } from '@angular/common/http/src/xsrf';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];
  cargando = true ;

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }


  private cargarProductos() {

    return new Promise( ( resume, reject ) => {

      this.http.get('https://portafolio-48864.firebaseio.com/productos_idx.json')
      .subscribe( ( resp: Producto[] ) => {
        console.log(resp);
        this.productos = resp ;


        // setTimeout(() => {
        this.cargando = false ;
        // }, 5000);
      });

    });


  }

  getProducto(id: string) {
    return this.http.get(`https://portafolio-48864.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string) {

    if (this.productos.length === 0) {
      // cargar Productos
      this.cargarProductos().then(() => {
      // ejecuta despues de tener los productos
      // aplicar filtro
      this.filtrarProductos( termino ) ;
      });

    } else {
      // aplicar el filtro
      this.filtrarProductos( termino ) ;
    }

    // this.productosFiltrado = this.productos.filter( producto => {
    //   console.log(this.productosFiltrado);
    //   return true;
    // });
  }
  private filtrarProductos( termino: string) {
    console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLowerCase();
    

    this.productos.forEach(prod => {
      const titulolower = prod.titulo.toLowerCase();

      if (prod.categoria.indexOf( termino ) >= 0 || titulolower.indexOf( termino ) >= 0 ) {
        this.productosFiltrado.push( prod ) ;
      }
    });
  }
}
