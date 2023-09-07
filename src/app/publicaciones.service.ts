import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  constructor(private http: HttpClient) {}

  obtenerDatos(id: string): Observable<any> {
    const url = `https://api-bp-test.bigpuntos.com/central/publicaciones/listOne/${id}`; // Reemplaza con la URL de tu API
    return this.http.get(url);
  }
}
