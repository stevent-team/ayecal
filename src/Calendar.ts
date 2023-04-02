import Event from './Event'
import { CalendarMethod, CalendarName, CalendarProductId, CalendarScale, CalendarScope, CalendarTimeZone } from './properties'
import { takeOr } from './utils'

type CalendarProps = {
  name?: CalendarName
  scope?: CalendarScope
  timeZone?: CalendarTimeZone | null
  scale?: CalendarScale
  method?: CalendarMethod
  productId?: CalendarProductId
}

export default class Calendar {
  events: Event[]
  name: CalendarName | null
  scope: CalendarScope | null
  timeZone: CalendarTimeZone | null
  scale: CalendarScale | null
  method: CalendarMethod | null
  productId: CalendarProductId | null

  constructor(props: CalendarProps = {}) {
    this.events = []
    this.name = takeOr(props.name, null)
    this.scope = takeOr(props.scope, null)
    this.scale = takeOr(props.scale, 'GREGORIAN')
    this.method = takeOr(props.method, 'PUBLISH')
    this.productId = takeOr(props.productId, '-//AyeCal//AyeCal//EN')
    this.timeZone = takeOr(props.timeZone, Intl.DateTimeFormat().resolvedOptions().timeZone)
  }


  // Add event to calendar
  addEvent(event: Event) {
    // Ensure event is an Event object
    if (!(event instanceof Event))
      event = new Event({ ...event, scope: this.scope })

    // Look for uid collision
    const collidingEvent = this.events.find(e => e.uid === event.uid)
    if (collidingEvent)
      throw new Error(`Failed to add event with uid ${event.uid}, uid already present in calendar`)

    this.events = [...this.events, event]

    return this
  }

  setTimezone(timeZone: CalendarTimeZone) {
    this.timeZone = timeZone
    return this
  }


  /**
   * Formats the calendar as an iCalendar string that conforms to {@link https://datatracker.ietf.org/doc/html/rfc5545 | RFC 5545}.
   */
  toString() {
    const fields = {
      PRODID: this.productId,
      VERSION: '2.0',
      METHOD: this.method,
      CALSCALE: this.scale,
      'X-WR-CALNAME': this.name,
      'X-WR-TIMEZONE': this.timeZone,
    }

    // Convert calendar fields to a string
    const text = Object.entries(fields)
      .filter(([k, v]) => k && v)
      .map(([k, v]) => `${k}:${v}`)
      .join('\n')

    // Convert calendar events to a string
    const eventText = this.events
      .map(event => event.toString())
      .join('\n')

    return `BEGIN:VCALENDAR\n${text}\n${eventText}\nEND:VCALENDAR`
  }
}
