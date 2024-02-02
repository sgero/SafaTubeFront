import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Video} from "../models/Video";
import {Mensaje} from "../models/Mensaje";
import {Usuario} from "../models/Usuario";
import {Canal} from "../models/Canal";
import {TipoCategoria} from "../models/TipoCategoria";


@Injectable({
  providedIn: 'root',
})
export class Generalservice {

  private url = 'http://localhost:8000';
  constructor(private http: HttpClient) { }
  enviarIdVideoPlayingBaseDatos(id:number){
    return this.http.get<Video>('http://localhost:8000/api/video/get/'+id)
  }

  crearMensaje(data: Mensaje){
    return this.http.post<object>(this.url + "/api/mensaje/crear", data);
  }

  getVideosRecomendados(usuarioId: number) {
    return this.http.post<Video[]>('http://localhost:8000/api/video/getVideosRecomendados', usuarioId)
  }
  getVideosRecomendadosAPartirDeVideo(videoId: number) {
    return this.http.post<Video[]>('http://localhost:8000/api/video/getVideosRecomendadosAPartirDeVideo', videoId)
  }

  getVideosDeCanalesSuscritosPage(usuarioId: number) {
    return this.http.post<Video[]>('http://localhost:8000/api/video/getVideosCanalesSuscritos', usuarioId)
  }

  getTipoCategorias() {
    return this.http.get<TipoCategoria>('http://localhost:8000/api/categoria/listar')
  }
  getVideosSegunCategoria(categoria: object) {
    return this.http.post<Video[]>('http://localhost:8000/api/video/por_categoria?XDEBUG_SESSION_START=19622', categoria)
  }

  BuscarVideo(palabraClave: string){
    return this.http.post<Video[]>('http://localhost:8000/api/video/buscar?XDEBUG_SESSION_START=15623', palabraClave);
  }

  BuscarVideoPorCanal(canalId: number){
    return this.http.post<Video[]>('http://localhost:8000/api/video/por_canal', canalId);
  }

  BuscarCanal(palabraClave: string) {
    return this.http.post<Canal[]>('http://localhost:8000/api/canal/buscar', palabraClave);
  }

  CrearVideo(videoNuevo: Video){
    return this.http.post<Video>('http://localhost:8000/api/video/crear', videoNuevo);
  }
  listarMensaje(data: Mensaje){
    return this.http.post<Mensaje[]>(this.url + "/api/mensaje/listar", data);
  }
  buscarMensaje(data: Mensaje){
    return this.http.post<Canal[]>(this.url + "/api/mensaje/buscar", data);
  }
}
