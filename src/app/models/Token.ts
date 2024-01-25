import {Usuario} from "./Usuario";

export class Mensaje{
  id?: number;
  token?: string;
  fechaExpiracion?: Date;
  usuario?: Usuario;
}
