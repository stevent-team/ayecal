# 🏴‍☠️ AyeCal

Javascript iCal creation utility.

### Usage

Install from npm

```bash
npm install ayecal # or yarn add ayecal
```

**Creating Calendars**

```js
import ayecal from 'ayecal'

// Create a calendar
// Provide a name and a "scope" which distinguishes events from other calendars
const myCalendar = ayecal({
    name: 'My Calendar',
    scope: 'custom-calendar.net',
  })
  .setTimezone('Australia/Melbourne')
  .addEvent({
    summary: 'Jacob\'s 22nd Birthday Party',
    location: 'My apartment',
    description: 'Hey everyone! Come to my party :)',
    uid: 5678, // from your API
    startTime: new Date(),
    endTime: new Date(),
  })

// Convert to an ICS string
const myICS = myCalendar.toICS()
```

**Creating Events**

```js
import ayecal from 'ayecal'

// Create an event
const myEvent = ayecal.event({
  summary: 'Company Mixer',
  location: '32 Downtown St, Melbourne Australia',
  description: 'Hey everyone! Come to my party :)',
  uid: 5678, // from your API
  startTime: new Date(),
  endTime: new Date(),
})

// Convert to an ICS string
const eventICS = myEvent.toICS()

// Add to an existing calendar
const myCalendar = ayecal()
myCalendar.addEvent(myEvent)
```

### Contributing

PRs are welcomed :)

Run `yarn` to install dependencies then `yarn watch` to build on file changes.

Run `yarn test` before committing to run the test cases.

### To Do

- [ ] Recurring Event Support
- [ ] To Do Support
- [ ] ICS Parsing
- [ ] Non-mutable objects?
- [ ] Support all fields from the iCal spec

### License

MIT License, Ewan Breakey 2022
