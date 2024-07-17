import { describe, it, expect } from 'vitest'

import { formatDate } from './utility'

describe('Utility: formatDate', () => {
  it('formats date properly', () => {
    const formattedDate = formatDate('2024-07-16T07:30:03.499Z')
    expect(formattedDate).toBe('2024-07-16')
  })

  it('returns empty if no date od passed', () => {
    const formattedDate = formatDate()
    expect(formattedDate).toBe('')
  })
})
