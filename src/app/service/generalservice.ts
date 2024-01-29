import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Video} from "../models/Video";
import {Mensaje} from "../models/Mensaje";
import {Usuario} from "../models/Usuario";

@Injectable({
  providedIn: 'root',
})
export class Generalservice {

  private url = 'http://localhost:8000';
  constructor(private http: HttpClient) { }
  enviarIdVideoPlayingBaseDatos(id:number){
    return this.http.post<Video>('http://localhost:8080/api/video/get/', id)
  }

  crearMensaje(data: Mensaje){
    return this.http.post<object>(this.url + "/api/mensaje/crear", data);
  }
  listarMensaje(data: Mensaje){
    return this.http.post<Mensaje[]>(this.url + "/api/mensaje/listar", data);
  }
  buscarMensaje(data: Mensaje){
    return this.http.post<Usuario[]>(this.url + "/api/mensaje/buscar", data);
  }
}
