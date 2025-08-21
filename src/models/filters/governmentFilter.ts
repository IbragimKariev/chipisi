import { PaginatedFilter } from "./paginatedFilter";

export class GovernmentFilter extends PaginatedFilter{
  searchText: string | null
  regionId: number | null
  governmentId: number | null

  constructor(init?: Partial<GovernmentFilter>){
    super(init)

    this.searchText = null
    this.regionId = null
    this.governmentId = null
  }
}