import { Region } from "./region";

export class Government {
  id: number = 0;
  inn: string | null = null;
  name: string | null = null;
  nameKy: string | null = null;
  regionId: number | null = null;
  alias: string | null = null;
  longitude: number | null = null;
  latitude: number | null = null;

  region: Region | null = null;
}
 