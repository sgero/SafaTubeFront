import {Canal} from "./Canal";
import {Video} from "./Video";

export class ListaReproduccion{
  id?: number;
  nombre?: string;
  canal?: Canal;
  videos?: [Video];
}
