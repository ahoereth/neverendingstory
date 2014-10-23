// Template helper functions.


/**
 * Checks if the current visitor is logged in.
 */
Template.registerHelper('isLoggedin', function() {
  return !! Meteor.userId();
});


/**
 * Checks if the current visitor is not logged in.
 */
Template.registerHelper('isNotLoggedin', function() {
  return ! Meteor.userId();
});


/**
 * Checks if all following arguments are true.
 *
 * @param  {Boolean} args... List of arguments of any type. They will be
 *                           treated as booleans.
 * @return {Boolean}
 */
Template.registerHelper('all', function(/* args... */) {
  // Ignore the last argument because it contains a Spacebars specific object.
  for (var i = 0; i < arguments.length-1; i++) {
    if (! arguments[i])
      return false;
  }

  return true;
});


/**
 * Checks if any of the arguments is true.
 *
 * @param  {Boolean} args... List of arguments of any type. They will be
 *                           treated as booleans.
 * @return {Boolean}
 */
Template.registerHelper('any', function(/* args... */) {
  // Ignore the last argument because it contains a Spacebars specific object.
  for (var i = 0; i < arguments.length-1; i++) {
    if (arguments[i])
      return true;
  }

  return false;
});
