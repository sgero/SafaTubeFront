import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Video} from "../models/Video";
import {Mensaje} from "../models/Mensaje";
import {BusquedaVideo} from "../models/BusquedaVideo";

@Injectable({
  providedIn: 'root',
})
export class Generalservice {
  // constructor(private http: HttpClient) {}
  // enviarIdVideoPlayingBaseDatos(id:number){
  //   return this.http.post<Video>('http://localhost:8080/api/video/get/', id)
  // }

  private url = 'http://localhost:8000';
  constructor(private http: HttpClient) { }
  enviarIdVideoPlayingBaseDatos(id:number){
    return this.http.post<Video>('http://localhost:8080/api/video/get/', id)
  }

  crearMensaje(data: Mensaje){
    return this.http.post<object>(this.url + "/api/mensaje/crear", data);
  }

  BuscarVideo(palabraClave: string): Observable<any>{
    return this.http.post<any>('http://localhost:8000/api/video/buscar', palabraClave);
  }
}
