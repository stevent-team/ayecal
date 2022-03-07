import AyeEvent from './AyeEvent'

export class AyeCal {

  constructor(calendarTitle = '', scope = 'aye') {
    this.events = []
    this.title = calendarTitle
    this.scope = scope

    // Get timezone
    this.timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone

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
    // Ensure event is an AyeEvent object
    if (!(event instanceof AyeEvent))
      event = AyeEvent({ ...event, scope: this.scope })

    // Look for uid collision
    const collidingEvent = this.events.find(e => e.uid === event.uid)
    if (collidingEvent)
      throw new Error(`Failed to add event with uid ${event.uid}, uid already present in calendar`)
    
    return this
  }


  // Add multiple events to calendar
  addEvents(events) {
    events.forEach(event => this.addEvent(event))
    return this
  }


  // Set calendar timezone
  timezone(timeZoneName) {
    this.timeZoneName = timeZoneName 
    return this
  }


  // Create an ICS string
  toICS() {
    const fields = {
      PRODID: this.meta.prodID,
      VERSION: this.meta.version,
      METHOD: this.meta.method,
      'X-WR-CALNAME': this.title,
      'X-WR-TIMEZONE': this.timeZoneName,
    }

    const text = Object.entries(fields)
      .map(([k, v]) => `${k}:${v}`)
      .join('\n')

    return `BEGIN:VCALENDAR\n${text}\nEND:VCALENDAR`
  }
}

const ayecal = (...args) =>
  new AyeCal(...args)

export default ayecal
