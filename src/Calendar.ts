import type { LiteralUnion } from 'type-fest'

import Event from './Event'

/**
 * The calendar scale/system to use.
 *
 * @defaultValue `GREGORIAN`
 *
 * @see `CALSCALE` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.7.1 | RFC 5545}
 */
type CalendarScale = LiteralUnion<'GREGORIAN', string>

/**
 * The method associated with this calendar.
 *
 * When used in a MIME message entity, the value of this
 * property MUST be the same as the Content-Type "method" parameter
 * value. If either this property or the Content-Type
 * "method" parameter is specified, then the other MUST also be
 * specified.
 *
 * @defaultValue `PUBLISH`
 *
 * @see `METHOD` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.7.2 | RFC 5545}
 * @see Specification of methods in {@link https://datatracker.ietf.org/doc/html/rfc5546 | RFC 5546}
 */
type CalendarMethod = LiteralUnion<'PUBLISH' | 'REQUEST' | 'REPLY' | 'ADD' | 'CANCEL' | 'REFRESH' | 'COUNTER' | 'DECLINECOUNTER', string>

/**
 * The ID of the product that created this calendar.
 *
 * @defaultValue `-//AyeCal//AyeCal//EN`
 *
 * @example `-//ABC Corporation//NONSGML My Product//EN`
 *
 * @see `PRODID` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.7.3 | RFC 5545}
 */
type CalendarProductId = string

/**
 * The name of the calendar. This is a non-standard property and sets `X-WR-CALNAME`.
 *
 * @see Non-Standard Properties in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.8.2 | RFC 5545}
 */
type CalendarName = string

/**
 * The timezone of the whole calendar. This is a non-standard property and sets `X-WR-TIMEZONE`.
 * Setting to `null` will remove this from the calendar.
 *
 * Note that timezones can also be set individually for events.
 *
 * @defaultValue
 * Automatically determines the timezone using the following snippet:
 * ```
 * Intl.DateTimeFormat().resolvedOptions().timeZone
 * ```
 *
 * @see Non-Standard Properties in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.8.2 | RFC 5545}
 */
type CalendarTimeZone = string

/**
 * Scope to use for all IDs inside this calendar.
 * This ensures that any event IDs will not clash with other calendars.
 *
 * It is recommended that the scope be a domain name or a domain literal IP address of the host.
 *
 * @example `example.com`
 *
 * @see `UID` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.4.7 | RFC 5545}
 */
type CalendarScope = string

/**
 * Events inside this calendar in order of when they were added.
 */
type CalendarEvents = Event[]

type CalendarProps = {
  name?: CalendarName
  scope?: CalendarScope
  timeZone?: CalendarTimeZone | null
  scale?: CalendarScale
  method?: CalendarMethod
  productId?: CalendarProductId
}

/**
 * Returns the value if it's not undefined, otherwise returns the fallback
 */
const takeOr = <TValue, TFallback>(value: TValue, fallback: TFallback) => value === undefined ? fallback : value

export default class Calendar {
  events: CalendarEvents
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
