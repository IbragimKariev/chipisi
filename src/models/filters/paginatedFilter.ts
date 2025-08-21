export class PaginatedFilter {
  page: number;
  size: number;

  constructor(init?: Partial<PaginatedFilter>){
    this.page = 0;
    this.size = 30;

    if (init) {
      Object.assign(this, init);
    }
  }
}