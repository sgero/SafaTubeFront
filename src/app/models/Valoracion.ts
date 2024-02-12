import {Usuario} from "./Usuario";
import {Video} from "./Video";
import {Comentario} from "./Comentario";

export class Valoracion{
  id?: number;
  usuario?: Usuario;
  video?: Video;
  comentario?:Comentario;
  esLike?:boolean;
}
