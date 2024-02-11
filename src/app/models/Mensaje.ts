import {Usuario} from "./Usuario";

export class Mensaje{
  id?: number;
  texto?: string;
  username?: string;
  usuario_emisor?: number;
  usuario_receptor?: number;
}
