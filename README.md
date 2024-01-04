# 🏴‍☠️ AyeCal

[![npm version](https://img.shields.io/npm/v/ayecal)](https://www.npmjs.com/package/ayecal)
[![minzip size](https://img.shields.io/bundlephobia/minzip/ayecal)](https://bundlephobia.com/package/ayecal)

Typescript iCal creation, parsing and manipulation toolset 🪄📆
Conforms to the [RFC 5545](https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.8.2) specification.

> [!WARNING]
> This library is currently in alpha and the API may change significantly between versions.

## Usage

Install from npm

```bash
yarn add ayecal
```

### Creating Calendars

```ts
import { Calendar, Event } from 'ayecal'

// Create a calendar
// Provide a name and a "scope" which distinguishes events from other calendars
const myCalendar = new Calendar({
    name: 'My Calendar',
    scope: 'custom-calendar.net',
    timeZone: 'Australia/Melbourne',
  })
  .addEvent(new Event({
    summary: 'Jacob\'s 22nd Birthday Party',
    location: 'My apartment',
    description: 'Hey everyone! Come to my party :)',
    uid: 5678, // from your API
    startTime: new Date(),
    endTime: new Date(),
  }))

// Convert to an iCalendar string (ics)
const myICS = myCalendar.toString()
```

### Creating Events

```ts
import { Calendar, Event } from 'ayecal'

// Create an event
const myEvent = new Event({
  summary: 'Company Mixer',
  location: '32 Downtown St, Melbourne Australia',
  description: 'Hey everyone! Come to my party :)',
  uid: 5678, // from your API
  startTime: new Date(),
  endTime: new Date(),
})

// Convert to an iCalendar string (ics)
const eventICS = myEvent.toString()

// Add to an existing calendar
const myCalendar = new Calendar()
myCalendar.addEvent(myEvent)
```

## Contributing

Issues and pull requests are welcomed.

### Development Setup

1. Make sure you have `Node` installed, and run `corepack enable`
2. Run `yarn` to install dependencies
3. Run `yarn test` to run the test cases

### Changesets

This library uses [changesets](https://github.com/changesets/changesets), if the changes you've made would constitute a version bump, run `yarn changeset` and follow the prompts to document the changes you've made. Changesets are consumed on releases, and used to generate a changelog and bump version number.

## License

Created by Stevent and licensed under MIT
