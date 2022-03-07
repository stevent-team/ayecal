import { formatDate } from './utils'

export default class Event {
  constructor({
    summary,
    startTime,
    endTime,
    uid,
    description,
    createdTime,
    location,
    sequence,
    scope = 'aye',
    status = AyeEventStatus.CONFIRMED,
    transparent = false,
  }) {
     
    // Check Dates
    if (!(startTime instanceof Date) || !(endTime instanceof Date))
      throw new Error('startTime and endTime arguments must be Date types')

    // Check UID existence
    if (uid === undefined)
      throw new Error('UID argument must be provided to provide unique identifiers to each event')
    
    // Set props from fields
    this.startTime = startTime
    this.endTime = endTime
    this.createdTime = createdTime ?? (new Date())
    this.timeStamp = (new Date())
    this.uid = uid // Must be unique and provided
    this.description = description
    this.location = location ? location.replaceAll(',', '\\,') : ''
    this.status = status
    this.summary = summary // Event name
    this.scope = scope
    this.transparent = transparent
    this.sequence = sequence
  }

  // Create ics string from event
  toICS() {
    const fields = {
      DTSTART: formatDate(this.startTime),
      DTEND: formatDate(this.endTime),
      DTSTAMP: formatDate(this.timeStamp),
      UID: `${this.uid}@${this.scope}`,
      CREATED: formatDate(this.timeStamp),
      DESCRIPTION: this.description,
      'LAST-MODIFIED': formatDate(this.createdTime),
      LOCATION: this.location,
      STATUS: this.status,
      SUMMARY: this.summary,
      TRANSP: this.transparent ? 'TRANSPARENT' : 'OPAQUE',
      SEQUENCE: this.sequence,
    }

    const text = Object.entries(fields)
      .filter(([k, v]) => k && v)
      .map(([k, v]) => `${k}:${v}`)
      .join('\n')

    return `BEGIN:VEVENT\n${text}\nEND:VEVENT`
  }
}

export const EventStatus = {
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  TENTATIVE: 'TENTATIVE',
}
