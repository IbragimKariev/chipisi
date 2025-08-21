
import { Government } from "./government";
import { Region } from "./region";
import { Role } from "./role";

export class User {
  id: number = 0;
  login: string | null = null;
  password: string | null = null;
  name: string | null = null;
  secondName: string = "";
  lastName: string = "";
  regionId: number | null = null;
  roleId: number | null = null;
  governmentId: number | null = null;

  region: Region | null = null;
  role: Role | null = null;
  government: Government | null = null;
}
