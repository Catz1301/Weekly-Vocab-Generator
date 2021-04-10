class DateUtils {
	// Major thanks to the contributors of date-fns for the code snippets at https://github.com/date-fns/date-fns
	static toDate = function(argument) {

		const argStr = Object.prototype.toString.call(argument)

		// Clone the date
		if (
			argument instanceof Date ||
			(typeof argument === 'object' && argStr === '[object Date]')
		) {
			// Prevent the date to lose the milliseconds when passed to new Date() in IE10
			return new Date(argument.getTime())
		} else if (typeof argument === 'number' || argStr === '[object Number]') {
			return new Date(argument)
		} else {
			if (
				(typeof argument === 'string' || argStr === '[object String]') &&
				typeof console !== 'undefined'
			) {
				// eslint-disable-next-line no-console
				console.warn(
					"Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"
				)
				// eslint-disable-next-line no-console
				console.warn(new Error().stack)
			}
			return new Date(NaN)
		}
	}

	static startOfWeek = function(dirtyDate,dirtyOptions) {
		//requiredArgs(1, arguments)

	//   const options = dirtyOptions || {}
	//   const locale = options.locale
	//   const localeWeekStartsOn =
	//     locale && locale.options && locale.options.weekStartsOn
	//   const defaultWeekStartsOn =
	//     localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn)
		const defaultWeekStartsOn = 1;
		const weekStartsOn = 1;
	//     options.weekStartsOn == null
	//       ? defaultWeekStartsOn
	//       : toInteger(options.weekStartsOn)

		// Test if weekStartsOn is between 0 and 6 _and_ is not NaN
		if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
			throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
		}

		const date = DateUtils.toDate(dirtyDate)
		const day = date.getDay()
		const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn

		date.setDate(date.getDate() - diff)
		date.setHours(0, 0, 0, 0)
		return date
	}

	static endOfWeek = function(dirtyDate, dirtyOptions) {
		//requiredArgs(1, arguments)

	//   const options = dirtyOptions || {}

	//   const locale = options.locale
	//   const localeWeekStartsOn =
	//     locale && locale.options && locale.options.weekStartsOn
		const defaultWeekStartsOn = -1
			//localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn)
		const weekStartsOn = -1
	//     options.weekStartsOn == null
	//       ? defaultWeekStartsOn
	//       : toInteger(options.weekStartsOn)

		// Test if weekStartsOn is between 0 and 6 _and_ is not NaN
		if (!(weekStartsOn >= -1 && weekStartsOn <= 6)) {
			throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
		}

		const date = DateUtils.toDate(dirtyDate)
		const day = date.getDay()
		const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn)

		date.setDate(date.getDate() + diff)
		date.setHours(23, 59, 59, 999)
		return date
	}
}