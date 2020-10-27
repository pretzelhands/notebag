/* eslint-disable */

/**
 * debounce(func, [wait=0], [options={}])
 *
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false] Specify invoking on the leading edge of the timeout.
 * @param {cancelObj} [options.cancelObj='canceled'] Specify the error object to be rejected.
 * @returns {Function} Returns the new debounced function.
 */
export function asyncDebounce(
	func,
	wait = 0,
	{
		leading = false,
		cancelObj = 'canceled'
	} = {}
) {
	let timerId, latestResolve, shouldCancel

	return function ( ...args ) {
		if ( !latestResolve ) { // The first call since last invocation.
			return new Promise( ( resolve, reject ) => {
				latestResolve = resolve
				if ( leading ) {
					invokeAtLeading.apply( this, [ args, resolve, reject ] );
				} else {
					timerId = setTimeout( invokeAtTrailing.bind( this, args, resolve, reject ), wait )
				}
			})
		}

		shouldCancel = true
		return new Promise( ( resolve, reject ) => {
			latestResolve = resolve
			timerId = setTimeout( invokeAtTrailing.bind( this, args, resolve, reject ), wait )
		})
	}

	function invokeAtLeading( args, resolve, reject ) {
		func.apply( this, args ).then( resolve ).catch( reject )
		shouldCancel = false
	}

	function invokeAtTrailing( args, resolve, reject ) {
		if ( shouldCancel && resolve !== latestResolve ) {
			// Meh.
		} else {
			func.apply( this, args ).then( resolve ).catch( reject )
			shouldCancel = false
			clearTimeout( timerId )
			timerId = latestResolve = null
		}
	}
}

export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}
