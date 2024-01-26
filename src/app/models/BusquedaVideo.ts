import {TipoCategoria} from "./TipoCategoria";
import {Canal} from "./Canal";

export class BusquedaVideo{
  titulo?: string;
  fecha?: Date;
  totalVisitas?: number;
  contadorLikes?: number;
  contadorDislikes?: number;
  tipoCategoria?: TipoCategoria;
  canal?: Canal;
}
