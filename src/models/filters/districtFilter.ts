import { PaginatedFilter } from "./paginatedFilter";

export class DistrictFilter extends PaginatedFilter {
    regionId: number | null = null;
    searchText: string | null = null;

    constructor(init?: Partial<DistrictFilter>) {
        super();
        if (init) {
            Object.assign(this, init);
        }
    }
}