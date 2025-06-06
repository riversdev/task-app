import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from '@/App'

describe('initial tests', () => {
  test('should render the app', () => {
    const { container } = render(<App />)

    expect(container).toBeDefined()
    screen.debug()
  })
})
