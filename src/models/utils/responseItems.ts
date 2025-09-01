export class ResponseItems<T> {
  items: T | null
  page: string | null
  pageSize: Date | null
  total: number | null

  constructor(init?: Partial<ResponseItems<T>>){
    this.page = null
    this.pageSize = null
    this.items = null
    this.total = null

    if(init){
      Object.assign(this, init)
    }
  }
}