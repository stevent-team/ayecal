# 👀 AyeCal
Javascript ICal Creation utility.


### Usage

Install from npm
```
npm install ayecal # or yarn add ayecal
```

**Creating Calendars**
```js
import { ayecal } from 'ayecal'

// Create a calendar
// Provide a name and a "scope" which distinguishes events from other calendars
const myCal = ayecal('My Calendar', 'custom-calendar.net')
  .timezone('Australia/Melbourne')
  .addEvent({
    summary: 'Jacob\'s 22nd Birthday Party',
    location: 'My apartment',
    description: 'Hey everyone! Come to my party :)',
    uid: 5678, // from your API
    startTime: new Date(),
    endTime: new Date(),
  })

// Convert to an ICS string
const myICS = myCal.toICS()
```

**Creating Events**
```js
import { AyeEvent } from 'ayecal'

// Create an event
const myEvent = AyeEvent({
  summary: 'Company Mixer',
  location: '32 Downtown st, Melbourne Australia',
  description: 'Hey everyone! Come to my party :)',
  uid: 5678 // from your API
  startTime: new Date(),
  endTime: new Date(),
})

// Convert to an ICS string
const eventICS = myEvent.toICS()
```

### Contributing

PRs are welcomed :)

### To Do
- [ ] Recurring Event Support
- [ ] To Do Support
- [ ] ICS Parsing


### Copyright
MIT License, Ewan Breakey 2022
