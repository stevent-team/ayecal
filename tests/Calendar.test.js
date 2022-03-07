import Calendar from '../src/Calendar'
import Event from '../src/Event'

const testDate = new Date('2022-08-17T17:00:00')

test('creates a calendar', () => {
  const myCalendar = new Calendar({
    name: 'My Calendar',
    scope: 'testing',
  })

  expect(myCalendar.events).toHaveLength(0)
  expect(myCalendar.name).toBe('My Calendar')
  expect(myCalendar.scope).toBe('testing')
  expect(myCalendar.timeZone).toBe(Intl.DateTimeFormat().resolvedOptions().timeZone)
})

test('sets the timezone', () => {
  const myCalendar = new Calendar()
  myCalendar.setTimezone('fake/timezone')
  expect(myCalendar.timeZone).toBe('fake/timezone')
})

test('adds an event directly', () => {
  const myCalendar = new Calendar()
  myCalendar.addEvent({
    uid: 0,
    startTime: testDate,
    endTime: testDate,
  })
  
  expect(myCalendar.events).toHaveLength(1)
})

test('adds an event via object', () => {
  const myCalendar = new Calendar()
  const myEvent = new Event({
    uid: 0,
    startTime: testDate,
    endTime: testDate,
  })
  myCalendar.addEvent(myEvent)

  expect(myCalendar.events).toHaveLength(1)
})

test('adds multiple events', () => {
  const myCalendar = new Calendar()
  myCalendar.addEvents([
    { uid: 0, startTime: testDate, endTime: testDate },
    { uid: 1, startTime: testDate, endTime: testDate },
    { uid: 2, startTime: testDate, endTime: testDate },
  ])

  expect(myCalendar.events).toHaveLength(3)
})

test('throws on duplicated id', () => {
  const myCalendar = new Calendar()
  const myEvent = new Event({
    uid: 0,
    startTime: testDate,
    endTime: testDate,
  })
  expect(() => {
    myCalendar.addEvents([myEvent, myEvent, myEvent])
  }).toThrowError('uid already present')
})
