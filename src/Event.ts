import { ComponentCreatedTime, ComponentDescription, ComponentEndTime, ComponentId, ComponentLocation, ComponentRevision, ComponentStartTime, ComponentSummary, ComponentTimeStamp, ComponentUpdatedTime, CustomProperty, EventBusy, EventStatus } from './properties'
import { formatDate, escapeText, takeOr, generateUUID } from './utils'

export type EventProperties = Partial<Pick<Event, 'id' | 'startTime' | 'endTime' | 'summary' | 'description' | 'location' | 'createdTime' | 'updatedTime' | 'timeStamp' | 'revision' | 'status' | 'busy' | 'custom'>> & {
  startTime: ComponentStartTime
}

/**
 * An AyeCal Event.
 *
 * @see `VEVENT` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.6.1 | RFC 5545}
 */
export class Event {
  /** @inheritdoc ComponentId */
  id: ComponentId
  /** @inheritdoc ComponentStartTime */
  startTime: ComponentStartTime
  /** @inheritdoc ComponentEndTime */
  endTime: ComponentEndTime | null
  /** @inheritdoc ComponentSummary */
  summary: ComponentSummary | null
  /** @inheritdoc ComponentDescription */
  description: ComponentDescription | null
  /** @inheritdoc ComponentLocation */
  location: ComponentLocation | null
  /** @inheritdoc ComponentCreatedTime */
  createdTime: ComponentCreatedTime | null
  /** @inheritdoc ComponentUpdatedTime */
  updatedTime: ComponentUpdatedTime | null
  /** @inheritdoc ComponentTimeStamp */
  timeStamp: ComponentTimeStamp
  /** @inheritdoc ComponentRevision */
  revision: ComponentRevision | null
  /** @inheritdoc EventStatus */
  status: EventStatus | null
  /** @inheritdoc EventBusy */
  busy: EventBusy | null
  /**
   * Any custom properties in the Event.
   *
   * @see Non-Standard Properties in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.8.2 | RFC 5545}
   */
  custom: Record<CustomProperty, string>

  constructor(props: EventProperties) {
    this.id = takeOr(props.id, generateUUID())
    this.startTime = props.startTime
    this.endTime = takeOr(props.endTime, null)
    this.summary = takeOr(props.summary && escapeText(props.summary), null)
    this.description = takeOr(props.description && escapeText(props.description), null)
    this.location = takeOr(props.location && escapeText(props.location), null)
    this.createdTime = takeOr(props.createdTime, new Date())
    this.updatedTime = takeOr(props.createdTime, new Date())
    this.timeStamp = takeOr(props.timeStamp, new Date())
    this.revision = takeOr(props.revision, 0)
    this.status = takeOr(props.status, null)
    this.busy = takeOr(props.busy, true)
    this.custom = takeOr(props.custom, {})
  }

  /**
   * Formats the event as an iCalendar string that conforms to {@link https://datatracker.ietf.org/doc/html/rfc5545 | RFC 5545}.
   */
  toString(scope: string | null) {
    const fields = {
      DTSTART: formatDate(this.startTime),
      DTEND: this.endTime && formatDate(this.endTime),
      DTSTAMP: formatDate(this.timeStamp),
      UID: `${this.id}${scope && `@${scope}`}`,
      CREATED: formatDate(this.timeStamp),
      DESCRIPTION: this.description,
      'LAST-MODIFIED': this.createdTime && formatDate(this.createdTime),
      LOCATION: this.location,
      STATUS: this.status,
      SUMMARY: this.summary,
      TRANSP: this.busy && (this.busy ? 'OPAQUE' : 'TRANSPARENT'),
      SEQUENCE: this.revision,
    }

    const text = Object.entries(fields)
      .filter(([k, v]) => k && v)
      .map(([k, v]) => `${k}:${v}`)
      .join('\n')

    return `BEGIN:VEVENT\n${text}\nEND:VEVENT`
  }

  /**
   * Attempt to parse an iCalendar string that conforms to {@link https://datatracker.ietf.org/doc/html/rfc5545 | RFC 5545} and return an Event.
   *
   * Should begin with `BEGIN:VEVENT` and end with `END:VEVENT`.
   *
   * @throws {Error}
   * If the iCalendar is invalid.
   */
  static fromIcs(ics: string) {
    // TODO:
    return new Event({ startTime: new Date() })
  }
}
