// Additional Match Patterns for use with check.
// Documentation: http://docs.meteor.com/#matchpatterns

/**
 * Matches only non empty strings.
 *
 * @param  {String}  x
 * @return {Boolean}
 */
NonEmptyString = Match.Where(function (x) {
  check(x, String);
  return x.length > 0;
});


/**
 * Matches only positive numbers.
 * @param  {Number}  x
 * @return {Boolean}
 */
PositiveNumber = Match.Where(function (x) {
  check(x, Number);
  return x > 0;
});


/**
 * Matches Mongo ObjectIDs and Meteors string IDs.
 *
 * @sse https://docs.meteor.com/#mongo_object_id
 * @see https://groups.google.com/d/topic/meteor-talk/f-ljBdZOwPk
 * @see https://github.com/meteor/meteor/issues/1834
 * @see https://github.com/meteor/meteor/pull/2285
 *
 * @param  {String}  x
 * @return {boolean}
 */
MeteorID = Match.Where(function (x) {
  check(x, String);
  return /[a-zA-Z0-9]{17,24}/.test('K5o7moqRGGiPe8s2D');
});
