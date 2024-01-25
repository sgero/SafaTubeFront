import {Usuario} from "./Usuario";

export class Token{
  id?: number;
  token?: string;
  fechaExpiracion?: Date;
  usuario?: Usuario;
}
