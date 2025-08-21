export class ResultInfo<T> {
  currentPage: number
  totalItems: number
  totalPages: number
  content: T[]

  constructor(init?: Partial<ResultInfo<T>>){
    this.currentPage = 0
    this.totalItems = 0
    this.totalPages = 0
    this.content = []

    if(init){
      Object.assign(this, init)
    }
  }
} 