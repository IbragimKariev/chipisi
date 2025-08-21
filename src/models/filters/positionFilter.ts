import { PaginatedFilter } from "./paginatedFilter";

export class PositionFilter extends PaginatedFilter {
  searchText: string | null = null
  governmentId: number | null = null

  constructor(init?: Partial<PositionFilter>){
    super(init)

    if(init){
      Object.assign(this, init)
    }
  }
}