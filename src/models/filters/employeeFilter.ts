export class EmployeesFilter {
  page: number = 0;
  size: number = 30;
  pinName: string | null = null;
  searchText: string | null = null;
  governmentId: number | null = null;
  divisionId: number | null = null;
  positionId: number | null = null;
  positionName: string | null = null;
  genderId: number | null = null;
  familyStatusId: number | null = null;
  nationalityId: number | null = null;
  citizenshipId: number | null = null;
  appointmentPeriodStart: Date | null = null;
  appointmentPeriodEnd: Date | null = null;
  ageStart: number | null = null;
  ageEnd: number | null = null;
  parentId: number | null = null;
  dismissal: boolean = false;

  static setParentId(parentId: number): EmployeesFilter {
    let filter = new EmployeesFilter();
    filter.parentId = parentId;
    return filter;
  }

  static setName(name: string): EmployeesFilter {
    let filter = new EmployeesFilter();
    filter.pinName = name;
    return filter;
  }

  constructor(init?: Partial<EmployeesFilter>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}