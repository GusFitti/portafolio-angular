import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  equipo: any;
  cargada = false;

  constructor( private http: HttpClient) {
    console.log('Servicio de infoPagina listo');

     // Leer el archivo Json

    this.cargarInfo();
    this.cargarEquipo();

  }
  private cargarInfo() {
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp : InfoPagina) => {
        this.cargada = true;
        this.info = resp;
        console.log(resp);
      });
  }

  private cargarEquipo() {
    this.http.get('https://portafolio-48864.firebaseio.com/equipo.json')
      .subscribe( (resp: any[]) => {
        this.equipo = resp;
        console.log(resp);
      });
  }

}
