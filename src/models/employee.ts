
import { Position } from "./position";
import { Role } from "./role";

export class Employee {
  id: number = 0;
  secondName: string | null = null;
  password: string | null = null;
  name: string | null = null;
  lastName: string | null = null;
  pin: string | null = null;
  birthdayDate: string | null = null;
  governmentId: number | null = null;
  positionId: number | null = null;
  roleId: number | null = null;

  // government: Government | null = null;
  position: Position | null = null;
  role: Role | null = null;

  getFullName: () => string = () => {
    return `${this.secondName} ${this.name} ${this?.lastName ?? ''}`.trim();
  }

  constructor(init?: Partial<Employee>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
