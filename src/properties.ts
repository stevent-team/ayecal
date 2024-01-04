import type { LiteralUnion } from 'type-fest'

/**
 * A custom property.
 *
 * It's highly recommended that you prefix any custom
 * properties with `X-` to prevent conflicts with existing
 * properties.
 *
 * @see Non-Standard Properties in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.8.2 | RFC 5545}
 */
export type CustomProperty = LiteralUnion<`X-${string}`, string>

/**
 * The calendar scale/system to use.
 *
 * @defaultValue `GREGORIAN`
 *
 * @see `CALSCALE` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.7.1 | RFC 5545}
 */
export type CalendarScale = LiteralUnion<'GREGORIAN', string>

/**
 * The method associated with this calendar.
 *
 * When used in a MIME message entity, the value of this
 * property MUST be the same as the Content-Type "method" parameter
 * value. If either this property or the Content-Type
 * "method" parameter is specified, then the other MUST also be
 * specified.
 *
 * @defaultValue `PUBLISH`
 *
 * @see `METHOD` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.7.2 | RFC 5545}
 * @see Specification of methods in {@link https://datatracker.ietf.org/doc/html/rfc5546 | RFC 5546}
 */
export type CalendarMethod = LiteralUnion<'PUBLISH' | 'REQUEST' | 'REPLY' | 'ADD' | 'CANCEL' | 'REFRESH' | 'COUNTER' | 'DECLINECOUNTER', string>

/**
 * The ID of the product that created this calendar.
 *
 * @defaultValue `-//AyeCal//AyeCal//EN`
 *
 * @example `-//ABC Corporation//NONSGML My Product//EN`
 *
 * @see `PRODID` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.7.3 | RFC 5545}
 */
export type CalendarProductId = string

/**
 * The name of the calendar. This is a non-standard property and sets `X-WR-CALNAME`.
 *
 * @see Non-Standard Properties in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.8.2 | RFC 5545}
 */
export type CalendarName = string

/**
 * The timezone of the whole calendar. This is a non-standard property and sets `X-WR-TIMEZONE`.
 * Setting to `null` will remove this from the calendar.
 *
 * Note that timezones can also be set individually for events.
 *
 * @defaultValue
 * Automatically determines the timezone using the following snippet:
 * ```
 * Intl.DateTimeFormat().resolvedOptions().timeZone
 * ```
 *
 * @see Non-Standard Properties in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.8.2 | RFC 5545}
 */
export type CalendarTimeZone = string

/**
 * Scope to use for all IDs inside this calendar.
 * This ensures that any event IDs will not clash with other calendars.
 *
 * It is recommended that the scope be a domain name or a domain literal IP address of the host.
 *
 * @example `example.com`
 *
 * @see `UID` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.4.7 | RFC 5545}
 */
export type CalendarScope = string

/**
 * A short summary or subject for this component. Also known as a title for events.
 *
 * @see `SUMMARY` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.1.12 | RFC 5545}
 */
export type ComponentSummary = string

/**
 * When this component begins.
 *
 * @see `DTSTART` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.2.4 | RFC 5545}
 */
export type ComponentStartTime = Date

/**
 * When this component ends.
 *
 * @see `DTEND` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.2.2 | RFC 5545}
 */
export type ComponentEndTime = Date

/**
 * When this component was created.
 *
 * @defaultValue The current date
 *
 * @see `DTSTAMP` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.7.2 | RFC 5545}
 */
export type ComponentTimeStamp = Date

/**
 * The unique identifier for this component.
 *
 * @defaultValue
 * If not provided, a uuid will automatically be generated.
 *
 * @example `19960401T080045Z-4000F192713-0052`
 *
 * @see `UID` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.4.7 | RFC 5545}
 */
export type ComponentId = string

/**
 * A detailed description for this component.
 *
 * @see `DESCRIPTION` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.1.5 | RFC 5545}
 */
export type ComponentDescription = string

/**
 * When this component was created.
 *
 * @see `CREATED` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.7.1 | RFC 5545}
 */
export type ComponentCreatedTime = Date

/**
 * When this component was last updated.
 *
 * @see `LAST-MODIFIED` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.7.3 | RFC 5545}
 */
export type ComponentUpdatedTime = Date

/**
 * The revision number of this component, starting at 0 from when the component is first created.
 *
 * @defaultValue `0`
 *
 * @see `SEQUENCE` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.7.4 | RFC 5545}
 */
export type ComponentRevision = number

/**
 * The location/venue for the activity defined by this component.
 *
 * @see `LOCATION` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.1.7 | RFC 5545}
 */
export type ComponentLocation = string

/**
 * The status of this event.
 *
 * @see `STATUS` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.1.11 | RFC 5545}
 */
export type EventStatus = 'TENTATIVE' | 'CONFIRMED' | 'CANCELLED'

/**
 * Whether or not this event appears to consume time on a calendar.
 * If `false`, this event will be transparent to busy time searches.
 *
 * @defaultValue `true`
 *
 * @see `TRANSP` in {@link https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.2.7 | RFC 5545}
 */
export type EventBusy = boolean
