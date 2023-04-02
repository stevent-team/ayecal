# 🏴‍☠️ AyeCal

[![npm version](https://img.shields.io/npm/v/@stevent-team/ayecal)](https://www.npmjs.com/package/@stevent-team/ayecal)
[![minzip size](https://img.shields.io/bundlephobia/minzip/@stevent-team/ayecal)](https://bundlephobia.com/package/@stevent-team/ayecal)

Typescript iCal creation and manipulation toolset 🪄📆

> **Note**
> This library is currently in alpha and the API may change significantly between versions.

## Usage

Install from npm

```bash
yarn add @stevent-team/ayecal
```

### Creating Calendars

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

### Creating Events

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

## Contributing

Issues and pull requests are welcomed.

Run `yarn` to install dependencies then `yarn watch` to build on file changes.

Run `yarn test` before committing to run the test cases.

This library uses [changesets](https://github.com/changesets/changesets), if the changes you've made would constitute a version bump, run `yarn changeset` and follow the prompts to document the changes you've made. Changesets are consumed on releases, and used to generate a changelog and bump version number.

## To Do

- [ ] Recurring Event Support
- [ ] To Do Support
- [ ] ICS Parsing
- [ ] Non-mutable objects?
- [ ] Support all fields from the iCal spec

## License

Created by Stevent and licensed under MIT
