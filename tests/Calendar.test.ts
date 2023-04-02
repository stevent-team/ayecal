import { describe, expect, it } from 'vitest'
import { Calendar, Event } from '@stevent-team/ayecal'

const TEST_DATE = new Date('2022-08-17T17:00:00')

describe('Calendar', () => {
  it('creates a calendar object with defaults', () => {
    const myCalendar = new Calendar()
    expect(myCalendar.name).toBe(undefined)
    expect(myCalendar.events).toHaveLength(0)
    expect(myCalendar.timeZone).toBe(Intl.DateTimeFormat().resolvedOptions().timeZone)
  })
})

describe('calendar.addEvent', () => {
  it('adds the event to the list of events', () => {
    const myEvent = new Event()
    const myCalendar = new Calendar()
      .addEvent(myEvent)
    expect(myCalendar.events).toHaveLength(1)
    expect(myCalendar.events).toContain(myEvent)
  })

  it('rejects adding an event with the same UID', () => {
  })
})

// test('creates a calendar', () => {
//   const myCalendar = new Calendar({
//     name: 'My Calendar',
//     scope: 'testing',
//   })

//   expect(myCalendar.events).toHaveLength(0)
//   expect(myCalendar.name).toBe('My Calendar')
//   expect(myCalendar.scope).toBe('testing')
//   expect(myCalendar.timeZone).toBe(Intl.DateTimeFormat().resolvedOptions().timeZone)
// })

// test('sets the timezone', () => {
//   const myCalendar = new Calendar()
//   myCalendar.setTimezone('fake/timezone')
//   expect(myCalendar.timeZone).toBe('fake/timezone')
// })

// test('adds an event directly', () => {
//   const myCalendar = new Calendar()
//   myCalendar.addEvent({
//     uid: 0,
//     startTime: testDate,
//     endTime: testDate,
//   })
//   expect(myCalendar.events).toHaveLength(1)
// })

// test('adds an event via object', () => {
//   const myCalendar = new Calendar()
//   const myEvent = new Event({
//     uid: 0,
//     startTime: testDate,
//     endTime: testDate,
//   })
//   myCalendar.addEvent(myEvent)

//   expect(myCalendar.events).toHaveLength(1)
// })

// test('adds multiple events', () => {
//   const myCalendar = new Calendar()
//   myCalendar.addEvents([
//     { uid: 0, startTime: testDate, endTime: testDate },
//     { uid: 1, startTime: testDate, endTime: testDate },
//     { uid: 2, startTime: testDate, endTime: testDate },
//   ])

//   expect(myCalendar.events).toHaveLength(3)
// })

// test('throws on duplicated id', () => {
//   const myCalendar = new Calendar()
//   const myEvent = new Event({
//     uid: 0,
//     startTime: testDate,
//     endTime: testDate,
//   })
//   expect(() => {
//     myCalendar.addEvents([myEvent, myEvent, myEvent])
//   }).toThrowError('uid already present')
// })
