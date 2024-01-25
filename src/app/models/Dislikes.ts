import {Usuario} from "./Usuario";
import {Video} from "./Video";
import {Comentario} from "./Comentario";

export class Dislikes{
  id?: number;
  usuario?: Usuario;
  video?: Video;
  comentarioPadre?: Comentario;
}
