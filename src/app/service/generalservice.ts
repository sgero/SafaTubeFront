import {Injectable, Type} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams, HttpClientModule} from "@angular/common/http";
import {BehaviorSubject, firstValueFrom, Observable} from "rxjs";
import {Video} from "../models/Video";
import {Mensaje} from "../models/Mensaje";
import {Usuario} from "../models/Usuario";
import {Canal} from "../models/Canal";
import {TipoCategoria} from "../models/TipoCategoria";
import {Busqueda} from "../models/Busqueda";

import {Comentario} from "../models/Comentario";
import {Notificacion} from "../models/Notificacion";
import {Suscripcion} from "../models/Suscripcion";
import {CanalContado} from "../models/CanalContado";
import {ListaReproduccion} from "../models/ListaReproduccion";

@Injectable({
  providedIn: 'root',
})
export class Generalservice {

  private static debugQuery = '';
  private busqueda = new BehaviorSubject<any>(null);
  currentVariable = this.busqueda.asObservable();

  sendVariable(variable: any) {
    this.busqueda.next(variable);
  }

  private token: string | null = null;
  private tokenKey = 'token';
  private url = 'http://localhost:8000';

  constructor(private http: HttpClient) {
  }

  enviarIdVideoPlayingBaseDatos(id: number) {
    return this.http.post<Video>('http://localhost:8000/api/video/get', id)
  }

  enviarIdVideoRecibirComentarios(id: number) {
    return this.http.post<Comentario[]>('http://localhost:8000/api/video/getComentariosLista', id)
  }

  enviarComentarioPadreRecibirRespuestasLista(comentarios: any) {
    return this.http.post<Comentario[]>('http://localhost:8000/api/video/getRespuestaComentariosLista', comentarios);
  }

  crearMensaje(data: Mensaje) {
    return this.http.post<object>(this.url + "/api/mensaje/crear", data);
  }

  getVideosRecomendados(usuarioId: any) {
    return this.http.post<Video[]>('http://localhost:8000/api/video/getVideosRecomendados', usuarioId)
  }

  getVideosRecomendadosAPartirDeVideo(videoId: any) {
    return this.http.post<Video[]>('http://localhost:8000/api/video/getVideosRecomendadosAPartirDeVideo?', videoId)
  }

  getVideosDeCanalesSuscritosPage(usuarioId: any) {
    return this.http.post<Video[]>('http://localhost:8000/api/video/getVideosCanalesSuscritos', usuarioId)
  }

  getTipoCategorias() {
    return this.http.get<TipoCategoria>('http://localhost:8000/api/categoria/listar')
  }

  getVideosSegunCategoria(categoria: object) {
    return this.http.post<Video[]>('http://localhost:8000/api/video/por_categoria', categoria)
  }

  BuscarVideo(palabraClave: string) {
    let json = {busqueda: palabraClave}
    return this.http.post<Busqueda>('http://localhost:8000/api/video/buscar', palabraClave);
  }

  BuscarVideoPorCanal(canalId: number) {
    return this.http.post<Video[]>('http://localhost:8000/api/video/por_canal', canalId);
  }

  BuscarCanal(palabraClave: string) {
    return this.http.post<Canal[]>('http://localhost:8000/api/canal/buscar', palabraClave);
  }

  CrearVideo(videoNuevo: Video) {
    return this.http.post<Video>('http://localhost:8000/api/video/crear' +
      '', videoNuevo);
  }

  EditarVideo(video: Video) {
    return this.http.put<Video>('http://localhost:8000/api/video/editar/' + video.id, video);
  }

  EliminarVideo(video: Video) {
    return this.http.post<Video>('http://localhost:8000/api/video/eliminar', video);
  }

  enviarIdCanalRecibirListas(id: number) {
    return this.http.post<ListaReproduccion[]>('http://localhost:8000/api/listaReproduccion/getListas', id)
  }

  CrearListaReproduccion(listaReproduccionNueva: ListaReproduccion) {
    return this.http.post<ListaReproduccion>('http://localhost:8000/api/listaReproduccion/crear', listaReproduccionNueva);
  }

  AgregarVideoLista(listaReproduccion: ListaReproduccion, video: Video) {
    const datos = {
      lista: listaReproduccion,
      video: video
    };
    return this.http.post<ListaReproduccion>('http://localhost:8000/api/listaReproduccion/agregarVideo?XDEBUG_SESSION_START=18993', datos);
  }

  EditarListaReproduccion(listaReproduccion: ListaReproduccion) {
    return this.http.put<ListaReproduccion>('http://localhost:8000/api/listaReproduccion/editar/' + listaReproduccion.id, listaReproduccion);
  }

  EliminarListaReproduccion(listaReproduccion: ListaReproduccion) {
    return this.http.delete<ListaReproduccion>('http://localhost:8000/api/listaReproduccion/eliminar');
  }

  listarMensaje(data: Mensaje) {
    return this.http.post<Mensaje[]>(this.url + "/api/mensaje/listar", data);
  }

  buscarMensaje(data: Mensaje) {
    return this.http.post<CanalContado[]>(this.url + "/api/mensaje/buscar", data);
  }

  listarCanal(data: Canal) {
    return this.http.post<Canal[]>(this.url + "/api/canal/listar", data);
  }

  buscarCanal(data: Canal) {
    return this.http.post<Canal[]>(this.url + "/api/canal/buscar", data);
  }

  listarUsuario(data: Usuario) {
    return this.http.post<Usuario[]>(this.url + "/api/usuario/listar", data);
  }

  buscarUsuario(data: Usuario) {
    return this.http.post<Usuario[]>(this.url + "/api/usuario/buscar", data);
  }

  editarCanal(data: Canal) {
    return this.http.put<Canal[]>(this.url + "/api/canal/editar/" + data.id + '?XDEBUG_SESSION_START=10151', data);
  }

  editarUsuario(data: Usuario) {
    return this.http.post<Usuario[]>(this.url + "/api/usuario/editar", data);
  }

  registerUser(data: Usuario) {

    return this.http.post<Usuario[]>("/api/registro/registrar", data);
  }

  verificarCuenta(token: string) {
    return this.http.get<any>(`/api/registro/verificar_cuenta/${token}`);
  }

  countMensaje(data: Usuario) {
    return this.http.post<number>(this.url + "/api/notificacion/contar_mensaje", data);
  }

  crearComentario(respuesta: object) {
    return this.http.post<Comentario>('http://localhost:8000/api/comentario/crear', respuesta)
  }


  estaSuscrito(usuario: any, canal: any) {
    const datos = {
      usuario: usuario.id,
      canal: canal.id
    };
    return this.http.post<boolean>('http://localhost:8000/api/suscripcion/verificar', datos)
  }


  loginUser(data: any) {

    return firstValueFrom(this.http.post<any>(`/api/login_check`, data));
  }


  eliminarSuscripcion(usuario: any, video: any) {
    const datos = {
      usuario: usuario.id,
      canal: video.id
    };
    return this.http.post<any>('/api/suscripcion/eliminar', datos)
  }

  getCanalUsuarioLogeado(usuarioId: any) {
    return this.http.post<any>('/api/canal/get', usuarioId)
  }

  getCanalSegunUsername(username: any) {
    const datos = {
      usuario: username,
    };
    return this.http.post<any>('http://localhost:8000/api/canal/getCanalSegunUsername', datos)
  }

  suscribirse(usuario: any, canal: any) {
    const datos = {
      usuario: usuario.id,
      canal: canal.id
    };
    return this.http.post<any>('/api/suscripcion/crear', datos)
  }

  getUsuarioLogeado(username: any) {
    const datos = {
      usuario: username,
    };
    return this.http.post<Usuario>('/api/usuario/get', datos)
  }


  sumarVisualizacionVideo(usuario: any, video: any) {
    const datos = {
      usuario: usuario.id,
      video: video.id
    };
    return this.http.post<any>('http://localhost:8000/api/video/anyadirVisita?XDEBUG_SESSION_START=16807', datos)
  }

  crearLike(valoracion: any) {
    return this.http.post<any>('http://localhost:8000/api/valoracion/crear', valoracion)
  }

  countlike(data: Usuario) {
    return this.http.post<number>(this.url + "/api/notificacion/contar_like", data);
  }

  countDislike(data: Usuario) {
    return this.http.post<number>(this.url + "/api/notificacion/contar_dislike", data);
  }

  campana(data: Usuario) {
    return this.http.post<boolean>(this.url + "/api/notificacion/notificacion", data);
  }

  atender(data: Usuario) {
    return this.http.post<object>(this.url + "/api/notificacion/atendidas", data);
  }

  countSubs(data: Usuario) {
    return this.http.post<object>(this.url + "/api/notificacion/contarsubs", data);
  }

  getVideosSegunCanal(data: any) {
    return this.http.post<any>('http://localhost:8000/api/canal/getVideosSegunCanal', data)
  }

  getVideosPopularesSegunCanal(canal: any) {
    return this.http.post<any>('http://localhost:8000/api/canal/getVideosPopularesSegunCanal', canal)
  }

  getInfoCanal(data: any) {
    return this.http.post<any>('http://localhost:8000/api/canal/getInfoCanal', data)
  }

  getTipoContenido() {
    return this.http.get<any>('http://localhost:8000/api/canal/listartTipoContenido')
  }

  // getImagenPerfil(usuario: { username: string }) {
  //   return this.http.post<any>('http://localhost:8000/api/usuario/getImagenPerfil',usuario)
  //
  // }
  eliminarComentario(idComentario: any) {
    return this.http.delete <any>('http://localhost:8000/api/comentario/eliminar/' + idComentario)
  }


  verSuscriptoresEntreDosFechas(data: any, primerdia: any, ultimodia: any) {
    const datos = {
      idCanal: data,
      inicio: ultimodia,
      fin: primerdia
    };
    return this.http.post<any>('http://localhost:8000/api/suscripcion/verSuscriptoresEntreDosFechas?XDEBUG_SESSION_START=17036', datos)
  }

  crearloMensaje(data: Mensaje) {
    return this.http.post<object>(this.url + "/api/mensaje/crearlo", data);
  }

  cargarValoracionesVideo(video: Video) {
    return this.http.post<any>(this.url + "/api/valoracion/cargarValoracionesVideo?XDEBUG_SESSION_START=16272", video);
  }

  cargarValoracionesComentario(comentario: Comentario) {
    return this.http.post<any>(this.url + "/api/valoracion/cargarValoracionesComentario", comentario);
  }

  cargarSubs(data: Usuario) {
    return this.http.post<object>(this.url + "/api/canal/listarsubs", data);
  }

  subsCanal(canal: any) {
    return this.http.post<any>(this.url + "/api/canal/verSuscriptores", canal);
  }

  getHistorial(usuario: any) {
    return this.http.post<Video[]>(this.url + "/api/video/getHistorial?XDEBUG_SESSION_START=17615", usuario);
  }

  verifyUser(data: Usuario) {

    return this.http.post<Usuario[]>("/api/registro/verificar", data);
  }

  verifyEmailUser(token: string, data: Usuario) {
    const url = `/api/registro/verificarmail/${token}`;
    // return this.http.post<Usuario[]>( url, data);
    return this.http.post<{ token: string, usuario: Usuario[] }>(url, data);
  }

  recuperarPwd(data: Usuario) {
    return this.http.post<any>('/api/registro/recuperarpwd', data);
  }

  cargarPorcentajeValoracionesVideo(canal: any) {
    return this.http.post<any>('/api/valoracion/estadisticasValoracionesVideo', canal);
  }

  cargarMensajesGrafica(canal: any, fechas: any) {
    const datos = {
      idCanal: canal.id,
      fecha: fechas,
    };
    return this.http.post<any>('/api/mensaje/estadisticas', datos);
  }
}
