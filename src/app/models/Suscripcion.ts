import {Usuario} from "./Usuario";
import {Canal} from "./Canal";

export class Suscripcion{
  id?: number;
  usuarioSuscriptor?: Usuario;
  canalSuscrito?: Canal;
}
