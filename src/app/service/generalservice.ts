import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Video} from "../models/Video";
import {Mensaje} from "../models/Mensaje";

@Injectable({
  providedIn: 'root'
})
export class Generalservice {

  private url = 'http://localhost:8000';
  constructor(private http: HttpClient, private httpmodule:HttpClientModule) { }
  enviarIdVideoPlayingBaseDatos(id:number){
    return this.http.post<Video>('http://localhost:8080/api/video/get/', id)
  }

  crearMensaje(data: Mensaje){
    return this.http.post<Mensaje>(this.url + "/mensaje/crear", data);
  }
}
