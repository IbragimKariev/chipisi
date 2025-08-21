export class Region {
  id: number = 0;
  alias: string | null = null;
  name: string | null = null;
  nameKy: string | null = null;
  polygon: string | null = null;

  constructor(init?: Partial<Region>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
