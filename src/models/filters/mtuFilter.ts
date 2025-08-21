import { PaginatedFilter } from "./paginatedFilter";

export class MtuFilter extends PaginatedFilter {
    regionId: number | null = null;
    districtId: number | null = null;
    category1Id: number | null = null;
    category2Id: number | null = null;
    searchText: string | null = null;

    constructor(init?: Partial<MtuFilter>) {
        super();
        if (init) {
            Object.assign(this, init);
        }
    }
}