import { Event } from './Event'
import {
  CalendarMethod,
  CalendarName,
  CalendarProductId,
  CalendarScale,
  CalendarScope,
  CalendarTimeZone,
  CustomProperty,
} from './properties'
import { takeOr } from './utils'

export type CalendarProperties = Partial<
  Pick<Calendar, 'name' | 'scope' | 'timeZone' | 'scale' | 'method' | 'productId' | 'custom'>
>

/**
 * An AyeCal Calendar.
 *
 * @see `VCALENDAR` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.4 | RFC 5545}
 */
export class Calendar {
  /** @inheritdoc CalendarName */
  name: CalendarName | null
  /** @inheritdoc CalendarScope */
  scope: CalendarScope | null
  /** @inheritdoc CalendarTimeZone */
  timeZone: CalendarTimeZone | null
  /** @inheritdoc CalendarScale */
  scale: CalendarScale | null
  /** @inheritdoc CalendarMethod */
  method: CalendarMethod | null
  /** @inheritdoc CalendarProductId */
  productId: CalendarProductId
  /**
   * Any custom properties in the Calendar.
   *
   * @see Non-Standard Properties in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.8.2 | RFC 5545}
   */
  custom: Record<CustomProperty, string>
  /**
   * Events in the Calendar.
   *
   * @see {@link Event}
   */
  #events: Event[]

  constructor(props: CalendarProperties = {}) {
    this.name = takeOr(props.name, null)
    this.scope = takeOr(props.scope, null)
    this.scale = takeOr(props.scale, 'GREGORIAN')
    this.method = takeOr(props.method, 'PUBLISH')
    this.productId = takeOr(props.productId, '-//AyeCal//AyeCal//EN')
    this.timeZone = takeOr(props.timeZone, Intl.DateTimeFormat().resolvedOptions().timeZone)
    this.custom = takeOr(props.custom, {})
    this.#events = []
  }

  get events() {
    return this.#events
  }

  /**
   * Add an event to the Calendar.
   *
   * @throws {Error}
   * If an event with the same ID already exists in this Calendar.
   */
  addEvent(newEvent: Event) {
    // Look for uid collision
    const collidingEvent = this.#events.find((event) => event.id === newEvent.id)
    if (collidingEvent) throw new Error(`Failed to add event with id ${newEvent.id}, id already present in calendar`)

    this.#events = [...this.#events, newEvent]

    return this
  }

  /**
   * Removes an event by ID from the Calendar. Does nothing if there are no matching events.
   */
  removeEvent(eventId: string) {
    this.#events = this.#events.filter((event) => event.id !== eventId)
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
      ...this.custom,
    }

    // Convert calendar fields to a string
    const text = Object.entries(fields)
      .filter(([k, v]) => k && v)
      .map(([k, v]) => `${k}:${v}`)
      .join('\n')

    // Convert calendar events to a string
    const eventText = this.#events.map((event) => event.toString(this.scope)).join('\n')

    return `BEGIN:VCALENDAR\n${text}\n${eventText}\nEND:VCALENDAR`
  }

  /**
   * Attempt to parse an iCalendar string that conforms to {@link https://datatracker.ietf.org/doc/html/rfc5545 | RFC 5545} and return a Calendar.
   *
   * Should begin with `BEGIN:VCALENDAR` and end with `END:VCALENDAR`.
   *
   * @throws {Error}
   * If the iCalendar is invalid.
   */
  // static fromIcs(ics: string) {
  //   // TODO:
  //   return new Calendar()
  // }
}
