import { ComponentCreatedTime, ComponentDescription, ComponentEndTime, ComponentId, ComponentLocation, ComponentRevision, ComponentStartTime, ComponentSummary, ComponentUpdatedTime, EventBusy, EventStatus } from './properties'
import { formatDate, escapeText, takeOr, generateUUID } from './utils'

export type EventProps = {
  id?: ComponentId
  startTime: ComponentStartTime
  endTime?: ComponentEndTime | null
  summary?: ComponentSummary | null
  description?: ComponentDescription | null
  location?: ComponentLocation | null
  createdTime?: ComponentCreatedTime | null
  updatedTime?: ComponentUpdatedTime | null
  revision?: ComponentRevision | null
  status?: EventStatus | null
  busy?: EventBusy | null
}

export default class Event {
  id: ComponentId
  startTime: ComponentStartTime
  endTime: ComponentEndTime | null
  summary: ComponentSummary | null
  description: ComponentDescription | null
  location: ComponentLocation | null
  createdTime: ComponentCreatedTime | null
  updatedTime: ComponentUpdatedTime | null
  timeStamp: Date
  revision: ComponentRevision | null
  status: EventStatus | null
  busy: EventBusy | null

  constructor(props: EventProps) {
    // Check start date
    if (!(props.startTime instanceof Date))
      throw new Error('startTime property must be a Date type')

    // Set props from fields
    this.id = takeOr(props.id, generateUUID())
    this.startTime = props.startTime
    this.endTime = takeOr(props.endTime, null)
    this.summary = takeOr(props.summary && escapeText(props.summary), null)
    this.description = takeOr(props.description && escapeText(props.description), null)
    this.location = takeOr(props.location && escapeText(props.location), null)
    this.createdTime = takeOr(props.createdTime, new Date())
    this.updatedTime = takeOr(props.createdTime, new Date())
    this.timeStamp = new Date()
    this.revision = takeOr(props.revision, 0)
    this.status = takeOr(props.status, null)
    this.busy = takeOr(props.busy, true)
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
}
