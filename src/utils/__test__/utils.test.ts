import { describe, it, expect } from 'vitest'
import { isAxiosError, isAxiosErrorUnprocessableEntity } from '../utils'
import { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/HttpStatusCode.enum'
describe('isAxiosError', () => {
  //it dung de ghi chu truong hop can test
  it('isAxiosError  trả về boolean')
  // Mong đợi giá trị trả về
  expect(isAxiosError(new Error())).toBe(false)
  expect(isAxiosError(new AxiosError())).toBe(true)
})
describe('isAxiosErrorUnprocessableEntity', () => {
  it('isAxiosErrorUnprocessableEntity  trả về boolean', () => {
    expect(isAxiosErrorUnprocessableEntity(new Error())).toBe(false)
    expect(
      isAxiosErrorUnprocessableEntity(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          data: null
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(false)
    expect(
      isAxiosErrorUnprocessableEntity(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(true)
  })
})
