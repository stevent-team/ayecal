import Event from './Event'

export default class Calendar {
  constructor({
    name = '',
    scope = 'aye',
  } = {}) {
    this.events = []
    this.name = name
    this.scope = scope

    // Get timezone
    this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    // Calendar Meta Information 
    this.meta = {
      prodID: '-//AyeCal//AyeCal//EN',
      version: 2.0,
      scale: 'GREGORIAN',
      method: 'PUBLISH',
    }
  }


  // Add event to calendar
  addEvent(event) {
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


  // Add multiple events to calendar
  addEvents(events) {
    events.forEach(event => this.addEvent(event))
    return this
  }


  // Set calendar timezone
  setTimezone(timeZone) {
    this.timeZone = timeZone
    return this
  }


  // Create an ICS string
  toICS() {
    const fields = {
      PRODID: this.meta.prodID,
      VERSION: this.meta.version,
      METHOD: this.meta.method,
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
      .map(event => event.toICS())
      .join('\n')

    return `BEGIN:VCALENDAR\n${text}\n${eventText}\nEND:VCALENDAR`
  }
}
