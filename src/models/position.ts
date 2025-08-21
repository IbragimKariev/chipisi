import { Government } from "./government";

export class Position {
  id: number = 0
  alias: string | null = null
  name: string | null = null
  nameKy: string | null = null
  governmentId: number | null = null

  government: Government | null = null

  constructor(init?: Partial<Position>){
    if(init){
      Object.assign(this, init)
    }
  }
}
