import {Usuario} from "./Usuario";
import {TipoContenido} from "./TipoContenido";

export class Canal{
  id?: number;
  descripcion?: string;
  nombre?: string;
  apellidos?: string;
  fechaNacimiento?: Date;
  telefono?: number;
  foto?: string;
  usuario?: Usuario;
  tipoContenido?: TipoContenido;
  total_suscriptores?: number;
  banner?: string;

}
