export class ResponseData<T> {
  success: boolean
  message: string | null
  result: T | null
  error: string | null
  time: Date | null
  ver: string | null

  constructor(init?: Partial<ResponseData<T>>){
    this.success = false
    this.message = null
    this.result = null
    this.error = null
    this.time = null
    this.ver = null

    if(init){
      Object.assign(this, init)
    }
  }
}