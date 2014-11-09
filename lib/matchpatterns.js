// Additional Match Patterns for use with check.
// Documentation: http://docs.meteor.com/#matchpatterns

/**
 * Matches only non empty strings.
 *
 * @param  {String}  x
 * @return {Boolean}
 */
NonEmptyString = Match.Where(function (x) {
  return Match.test(x, String) && x.length > 0;
});


/**
 * Matches only positive numbers.
 * @param  {Number}  x
 * @return {Boolean}
 */
PositiveNumber = Match.Where(function (x) {
  return Match.test(x, Number) && x > 0;
});


/**
 * Matches Mongo ObjectIDs and Meteors string IDs.
 *
 * @see https://docs.meteor.com/#mongo_object_id
 * @see https://groups.google.com/d/topic/meteor-talk/f-ljBdZOwPk
 * @see https://github.com/meteor/meteor/issues/1834
 * @see https://github.com/meteor/meteor/pull/2285
 *
 * @param  {String}  x
 * @return {Boolean}
 */
MeteorID = Match.Where(function (x) {
  return Match.test(x, String) && /[a-zA-Z0-9]{17,24}/.test(x);
});


/**
 * Matches whole numbers / integers. In JavaScript all numbers are just
 * 'Numbers' - there is no concept of Integers in the language.
 *
 * @param {Number}   x
 * @return {Boolean}
 */
Integer = Match.Where(function (x) {
  return Match.test(x, Number) && (x % 1 === 0);
});
