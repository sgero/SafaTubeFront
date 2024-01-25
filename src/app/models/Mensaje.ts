import {Usuario} from "./Usuario";

export class Mensaje{
  id?: number;
  texto?: string;
  fecha?: Date;
  leido?: boolean;
  usuarioEmisor?: Usuario;
  usuarioReceptor?: Usuario;
}
