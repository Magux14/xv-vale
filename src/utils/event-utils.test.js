import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { createCalendarEvent, getConfirmationUrl, getEventDateLabels, getTimeRemaining } from './event-utils.js'
import { invitationData } from '../data/invitation-data.js'

describe('getTimeRemaining', () => {
  it('separates full days, hours, minutes and seconds', () => {
    assert.deepEqual(getTimeRemaining('2026-12-19T20:00:00Z', Date.parse('2026-12-18T18:58:57Z')),
      { days: 1, hours: 1, minutes: 1, seconds: 3 })
  })

  it('never returns negative values after the event', () => {
    assert.deepEqual(getTimeRemaining('2020-01-01', Date.now()),
      { days: 0, hours: 0, minutes: 0, seconds: 0 })
  })

  it('handles invalid dates without NaN', () => {
    assert.equal(getTimeRemaining('invalid').seconds, 0)
  })
})

describe('calendar and confirmation', () => {
  it('derives visible date labels in the event time zone', () => {
    const labels = getEventDateLabels('2027-01-01T02:00:00Z', 'America/Mexico_City')
    assert.equal(labels.day, '16')
    assert.equal(labels.month, 'enero')
    assert.equal(labels.year, '2027')
    assert.equal(labels.weekday, 'sábado')
  })

  it('exports the event with the correct UTC date and CRLF endings', () => {
    const calendar = createCalendarEvent(invitationData)
    assert.ok(calendar.includes('DTSTART:20261219T200000Z\r\n'))
    assert.ok(calendar.includes('DTEND:20261220T080000Z\r\n'))
    assert.ok(calendar.endsWith('END:VCALENDAR\r\n'))
  })

  it('escapes reserved calendar punctuation', () => {
    const calendar = createCalendarEvent({ ...invitationData, name: 'Ana, María; XV\nFiesta' })
    assert.ok(calendar.includes('Ana\\, María\\; XV\\nFiesta'))
  })

  it('encodes guest details and normalizes the contact number', () => {
    const url = new URL(getConfirmationUrl({ name: ' Ana & José ', attendance: 'yes', guests: 2 }, '+52 123'))
    assert.equal(url.pathname, '/52123')
    assert.ok(url.searchParams.get('text').includes('Ana & José'))
    assert.ok(url.searchParams.get('text').includes('2 persona(s)'))
  })

  it('does not include a guest count when declining', () => {
    const url = new URL(getConfirmationUrl({ name: 'Ana', attendance: 'no', guests: 2 }, ''))
    assert.ok(url.searchParams.get('text').includes('No podré asistir'))
    assert.ok(!url.searchParams.get('text').includes('persona(s)'))
  })
})