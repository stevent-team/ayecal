import { Event } from '@stevent-team/ayecal'
import { describe, expect, it } from 'vitest'
import { EventProps } from '../src/Event'

const TEST_DATE = new Date('2022-08-17T17:00:00')

describe('Event', () => {
  it('creates an event object with defaults', () => {
    const myEvent = new Event({
      startTime: TEST_DATE,
    })

    expect(myEvent.startTime).toBe(TEST_DATE)
    expect(myEvent.endTime).toBe(null)
  })

  it('creates an event object with provided values', () => {
    const DATA = {
      id: '0',
      summary: 'Jacob\'s 22nd Birthday Party',
      location: 'My apartment',
      description: 'Hey everyone! Come to my party :)',
      startTime: TEST_DATE,
      endTime: TEST_DATE,
    } satisfies EventProps

    const myEvent = new Event(DATA)

    expect(myEvent.id).toBe(DATA.id)
    expect(myEvent.summary).toBe('Jacob\\\'s 22nd Birthday Party')
    expect(myEvent.location).toBe(DATA.location)
    expect(myEvent.description).toBe('Hey everyone! Come to my party :)')
    expect(myEvent.startTime).toBe(DATA.startTime)
    expect(myEvent.endTime).toBe(DATA.endTime)
    expect(myEvent.status).toBe(null)
    expect(myEvent.busy).toBe(true)
    expect(myEvent.revision).toBe(0)
  })
})
