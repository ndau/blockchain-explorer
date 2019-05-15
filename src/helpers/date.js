// import moment from 'moment'
// import { NDAU_EPOCH } from '../constants'
// import _ from 'lodash'

// export const DATE_FORMAT = 'DD MMM YYYY'
// export const DATE_FORMAT_LONG = 'MMMM DD, YYYY'

// export const getTodaysDate = () => {
//   return moment().format(DATE_FORMAT)
// }

// export const getDate = date => {
//   return moment(date).format(DATE_FORMAT)
// }

// export const getMicrosecondsSinceNdauEpoch = () => {
//   return moment().diff(NDAU_EPOCH, 'milliseconds') * 1000
// }

// export const addDaysToToday = (days, longFormat = true) => {
//   const date = moment().add(days, 'day')
//   return longFormat ? date.format(DATE_FORMAT_LONG) : date.format(DATE_FORMAT)
// }

// export const getDateFromMilliseconds = date => {
//   const walletDate = new Date(date)
//   const millisecondsWallet = walletDate.getTime() / 1000
//   const ndauEpoch = new Date(NDAU_EPOCH)
//   const millisecondsNdau = ndauEpoch.getTime()
//   const correctDate = new Date(millisecondsWallet + millisecondsNdau)
//   return moment(correctDate).format(DATE_FORMAT)
// }

// export const getDaysFromMicroseconds = microseconds => {
//   return Math.round(moment.duration(microseconds * 0.001, 'ms').asDays())
// }

// export const getDaysFromISODate = isoDate => {
//   if (!isoDate || !_.isString(isoDate)) {
//     return 0
//   }
//   return Math.round(
//     moment.duration(parseDurationToMicroseconds(isoDate) / 1000).asDays()
//   )
// }

// export const getMonthsFromISODate = isoDate => {
//   if (!isoDate || !_.isString(isoDate)) {
//     return 0
//   }
//   return Math.round(
//     moment.duration(parseDurationToMicroseconds(isoDate) / 1000).asMonths()
//   )
// }

// export const getYearsFromISODate = isoDate => {
//   if (!isoDate || !_.isString(isoDate)) {
//     return 0
//   }
//   return Math.round(
//     moment.duration(parseDurationToMicroseconds(isoDate) / 1000).asYears()
//   )
// }

// // useful constants for the parseDuration function
// // they're not exported.
// export const sec = 1000000
// export const day = 24 * 60 * 60 * sec
// // The pat elements are used to build up a pattern string that can parse the duration
// // constants. We can't use momentjs because we have fixed definitions of
// // month (30 days) and year (365 days) and moment wants them to be flexible
// // values based on when you ask the question. So we parse strings that look like
// // ISO-8601 strings but give them a fixed interpretation.
// // 1m is 1 month, t1m is 1 minute. 1y2m3dt4h5m6s7us covers everything
// // see the test file for more examples.
// export const durations = [
//   {}, // 0th element just so that the pattern number and the position in the array match
//   { pat: '(?:([0-9]+)y)?', dur: 365 * day },
//   { pat: '(?:([0-9]+)m)?', dur: 30 * day },
//   { pat: '(?:([0-9]+)d)?', dur: day },
//   { pat: '(?:([0-9]+)h)?', dur: 60 * 60 * sec },
//   { pat: '(?:([0-9]+)m)?', dur: 60 * sec },
//   { pat: '(?:([0-9]+)s)?', dur: sec },
//   { pat: '(?:([0-9]+)us?)?', dur: 1 }
// ]
// // now build the regexp out of the pieces
// export const pat = new RegExp(
//   'p?' +
//     durations[1].pat +
//     durations[2].pat +
//     durations[3].pat +
//     '(?:t' +
//     durations[4].pat +
//     durations[5].pat +
//     durations[6].pat +
//     durations[7].pat +
//     ')?'
// )

// // parses a duration string like 3dt4h and returns a duration in number
// // of microseconds.
// export const parseDurationToMicroseconds = dur => {
//   var match = pat.exec(dur.toLowerCase())
//   if (!match) {
//     return 0
//   }
//   // iterate through the matches looking for ones with data in them
//   var t = 0
//   for (var k = 1; k < match.length; k++) {
//     if (match[k]) {
//       t = t + parseInt(match[k]) * durations[k].dur
//     }
//   }
//   return t
// }

// export default {
//   getTodaysDate,
//   getDate,
//   getDateFromMilliseconds,
//   getDaysFromMicroseconds,
//   getMicrosecondsSinceNdauEpoch,
//   parseDurationToMicroseconds,
//   addDaysToToday,
//   getDaysFromISODate,
//   getMonthsFromISODate,
//   getYearsFromISODate
// }