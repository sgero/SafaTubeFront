import {Usuario} from "./Usuario";
import {Video} from "./Video";

export class Comentario{
  id?: number;
  texto?: string;
  fecha?: Date;
  contadorLikes?: number;
  contadorDislikes?: number;
  usuarioMencionado?:Usuario;
  usuario?: Usuario;
  video?: Video;
  comentarioPadre?: Comentario;
}
