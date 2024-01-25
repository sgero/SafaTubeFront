import {TipoNotificacion} from "./TipoNotificacion";
import {Canal} from "./Canal";


export class Notificacion{
  id?: number;
  mensaje?: string;
  fecha?: Date;
  tipoNotificacion?: TipoNotificacion;
  canal?: Canal;
  atendida?: boolean;
}
