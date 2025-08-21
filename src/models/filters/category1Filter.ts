import { PaginatedFilter } from "./paginatedFilter";

export class CategoryFilter extends PaginatedFilter {
    regionId: number | null = null;
    category1Id: number | null = null;
    category2Id: number | null = null;
    searchText: string | null = null;

    constructor(init?: Partial<CategoryFilter>) {
        super(init);
        if(init) {
            Object.assign(this, init);
        }
    }
}