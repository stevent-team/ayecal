import ayecal from '../src'
import Calendar from '../src/Calendar'
import Event from '../src/Event'

test('creates a calendar via ayecal', () => {
  expect(ayecal()).toBeInstanceOf(Calendar)
})

test('creates an event via ayecal', () => {
  expect(ayecal.event({ uid: 0, startTime: new Date(), endTime: new Date() })).toBeInstanceOf(Event)
})