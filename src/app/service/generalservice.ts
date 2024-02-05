import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams, HttpClientModule} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Video} from "../models/Video";
import {Mensaje} from "../models/Mensaje";
import {Usuario} from "../models/Usuario";
import {Canal} from "../models/Canal";
import {TipoCategoria} from "../models/TipoCategoria";
import {Busqueda} from "../models/Busqueda";

import {Comentario} from "../models/Comentario";

@Injectable({
  providedIn: 'root',
})
export class Generalservice {


  private busqueda = new BehaviorSubject<any>(null);
  currentVariable = this.busqueda.asObservable();

  sendVariable(variable: any) {
    this.busqueda.next(variable);
  }

  private url = 'http://localhost:8000';
  constructor(private http: HttpClient) { }
  enviarIdVideoPlayingBaseDatos(id:number){
    return this.http.get<Video>('http://localhost:8000/api/video/get/'+id)
  }
  enviarIdVideoRecibirComentarios(id:number){
    return this.http.post<Comentario[]>('http://localhost:8000/api/video/getComentariosLista',id)
  }
  enviarComentarioPadreRecibirRespuestasLista(comentarios: any) {
    return this.http.post<Comentario[]>('http://localhost:8000/api/video/getRespuestaComentariosLista', comentarios);
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
    let json=  {busqueda: palabraClave}
    return this.http.post<Busqueda>('http://localhost:8000/api/video/buscar?XDEBUG_SESSION_START=12578', palabraClave);
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

  listarCanal(data: Canal){
    return this.http.post<Canal[]>(this.url + "/api/canal/listar", data);
  }

  buscarCanal(data: Canal){
    return this.http.post<Canal[]>(this.url + "/api/canal/buscar", data);
  }

  listarUsuario(data: Usuario){
    return this.http.post<Usuario[]>(this.url + "/api/usuario/listar", data);
  }

  buscarUsuario(data: Usuario){
    return this.http.post<Usuario[]>(this.url + "/api/usuario/buscar", data);
  }

  editarCanal(data: Canal){
    return this.http.post<Canal[]>(this.url + "/api/canal/editar", data);
  }

  editarUsuario(data: Usuario){
    return this.http.post<Usuario[]>(this.url + "/api/usuario/editar", data);
  }

  // register(user: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register`, user);
  // }

  registerUser(data: Usuario){
    return this.http.post<Usuario[]>(this.url + "/api/registro", data);
  }

  crearComentario(respuesta: object) {
    return this.http.post<Comentario>('http://localhost:8000/api/comentario/crear?XDEBUG_SESSION_START=19195',respuesta)
  }


  estaSuscrito(usuario: any, video: any) {
    const datos = {
      usuario: usuario,
      canal: video
    };
    return this.http.post<boolean>('http://localhost:8000/api/suscripcion/verificar?XDEBUG_SESSION_START=19195',datos)
  }
}
