

export class User {
  id: number = 0;
  username: string | null = null;
  fullName: string | null = null;
  isActive: boolean | true = true;
  mustChangePassword: boolean | false = false;
  createdAt: string | null = null;
  companyId: any | null = null;
  roleId: number | null = null;
}
