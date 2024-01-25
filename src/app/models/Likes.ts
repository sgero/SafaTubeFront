import {Usuario} from "./Usuario";
import {Video} from "./Video";
import {Comentario} from "./Comentario";

export class Likes{
  id?: number;
  usuario?: Usuario;
  video?: Video;
  comentarioPadre?: Comentario;
}
