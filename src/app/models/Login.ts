import {Usuario} from "./Usuario";

export class Login {
  usuario?: string;
  password?: string;

  constructor(username: string, password: string) {
    this.usuario = username;
    this.password = password;
  }
}
