import Event, { EventStatus } from '../src/Event'

const testDate = new Date('2022-08-17T17:00:00')

test('creates an event', () => {
  const myEvent = new Event({
    summary: 'Jacob\'s 22nd Birthday Party',
    location: 'My apartment',
    description: 'Hey everyone! Come to my party :)',
    uid: 0,
    startTime: testDate,
    endTime: testDate,
  })

  expect(myEvent.summary).toBe('Jacob\\\'s 22nd Birthday Party')
  expect(myEvent.location).toBe('My apartment')
  expect(myEvent.description).toBe('Hey everyone! Come to my party :)')
  expect(myEvent.uid).toBe(0)
  expect(myEvent.startTime).toBe(testDate)
  expect(myEvent.endTime).toBe(testDate)
  expect(myEvent.status).toBe(EventStatus.CONFIRMED)
  expect(myEvent.scope).toBe('aye')
  expect(myEvent.transparent).toBe(false)
  expect(myEvent.sequence).toBeUndefined()
})

test('throws on missing dates', () => {
  expect(() => {
    new Event({ uid: 0 })
  }).toThrowError('must be Date types')
})

test('throws on missing uid', () => {
  expect(() => {
    new Event({ startTime: testDate, endTime: testDate })
  }).toThrowError('provide unique identifiers')
})
