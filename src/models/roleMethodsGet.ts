
import { EntRestAccess } from "./handBooks/restAccess";
import { EntServiceRoleMethodsType } from "./handBooks/serviceRoleMethodsType";
import { Role } from "./role";

export class EntRoleMethodsIdGet {
  id: number = 0;
  restHandBookId: EntServiceRoleMethodsType | null = null;;
  rolesId: Role | null = null;
  restId: EntRestAccess | null = null;
}
