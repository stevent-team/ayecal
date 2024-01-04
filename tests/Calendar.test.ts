import { describe, expect, it } from 'vitest'
import { Calendar, Event, CalendarProperties } from 'ayecal'

describe('Calendar', () => {
  it('creates a calendar object with defaults', () => {
    const myCalendar = new Calendar()

    expect(myCalendar.name).toBe(null)
    expect(myCalendar.events).toHaveLength(0)
    expect(myCalendar.timeZone).toBe(Intl.DateTimeFormat().resolvedOptions().timeZone)
  })

  it('creates a calendar object with provided values', () => {
    const DATA = {
      name: 'My Calendar',
      productId: '-//ABC Corporation//NONSGML My Product//EN',
      timeZone: 'fake/timezone',
    } satisfies CalendarProperties

    const myCalendar = new Calendar(DATA)

    expect(myCalendar.name).toBe(DATA.name)
    expect(myCalendar.productId).toBe(DATA.productId)
    expect(myCalendar.timeZone).toBe(DATA.timeZone)
    expect(myCalendar.events).toHaveLength(0)
  })
})

describe('Calendar.addEvent', () => {
  it('adds the event to the list of events', () => {
    const myEvent = new Event({
      startTime: new Date(),
    })
    const myCalendar = new Calendar()
      .addEvent(myEvent)

    expect(myCalendar.events).toHaveLength(1)
    expect(myCalendar.events).toContain(myEvent)
  })

  it('rejects adding an event with the same ID', () => {
    const myEvent = new Event({
      startTime: new Date(),
      id: 'cool-id',
    })
    const myCalendar = new Calendar()
      .addEvent(myEvent)

    expect(() => myCalendar.addEvent(myEvent)).toThrowError('Failed to add event with id cool-id, id already present in calendar')
  })
})
