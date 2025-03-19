import { describe, expect, it } from 'vitest'
import { sum } from './sum'

describe('sum', () => {
  it('should add two numbers', () => {
    expect(sum(1, 1)).toBe(2)
    expect(sum(1, 1)).not.toBe(1)
  })
})
