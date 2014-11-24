// Global helper functions.

/**
 * Calculates a new priority from a given component. Basically checks
 * the components priority and if there is a component with a higher priority.
 * Depending on the latter the new priority is in between those or just the
 * previous priority + 1.
 *
 * @param  {Component} component
 * @return {double}
 */
getNewPriority = function(component) {
  if ( _.isUndefined(component) )
    return 1;

  var prevPriority = component.priority, nextPriority;
  var decimal = prevPriority % 1;
  if ( decimal === 0 ) {
    nextPriority = prevPriority + 1;
  } else {
    nextPriority = prevPriority + (decimal/2);
  }

  return Math.round(nextPriority*1e20) / 1e20;
};


/**
 * Add preceding zero if given number has only 1 digit.
 *
 * TODO: Move to utilities package.
 *
 * @param  {Number} number
 * @return {String/Number}
 */
zeropad = function(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
};


// Date.now() shim
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}


// new Date().toISOString() shim
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
if (!Date.prototype.toISOString) {
  Date.prototype.toISOString = function() {
    return this.getUTCFullYear() +
      '-' + zeropad(this.getUTCMonth() + 1) +
      '-' + zeropad(this.getUTCDate()) +
      'T' + zeropad(this.getUTCHours()) +
      ':' + zeropad(this.getUTCMinutes()) +
      ':' + zeropad(this.getUTCSeconds()) +
      '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
      'Z';
  };
}


/**
 * Should be used when inserting documents into a collection with a createdAt
 * field. Wraps 'Date.prototype.toISOString'. When updating a document make use
 * of mongo's '$currentDate'.
 *
 * @see http://docs.mongodb.org/manual/reference/operator/update/currentDate/
 *
 * @string {Number} increment Milliseconds from now to offset the returned date.
 * @return {String}           Current date/time as ISOString.
 */
currentDate = function(increment) {
  var date = !increment ? new Date() : new Date(Date.now() + increment);
  return date.toISOString();
};
