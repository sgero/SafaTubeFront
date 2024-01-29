import {Canal} from "./Canal";
import {TipoCategoria} from "./TipoCategoria";
import {TipoPrivacidad} from "./TipoPrivacidad";

export class Video{
  id?: number;
  titulo?: string;
  descripcion?: string;
  enlace?: string;
  duracion?: number;
  fecha?: Date;
  totalVisitas?: number;
  contadorLikes?: number;
  contadorDislikes?: number;
  tipoCategoria?: TipoCategoria;
  tipoPrivacidad?: TipoPrivacidad;
  canal?: Canal;
}
