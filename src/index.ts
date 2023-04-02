import Calendar from './Calendar'
import Event from './Event'

const ayecal = args => new Calendar(args)
ayecal.event = args => new Event(args)

export default ayecal
