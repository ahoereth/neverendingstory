// Template helper functions.

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

/**
 * Substruction
 *
 * @param  {Integer} args...
 *
 * @return {Integer}
 */

Template.registerHelper('minus', function(/* args... */) {
  // Ignore the last argument because it contains a Spacebars specific object.
  return arguments[0]-arguments[1];
});



/**
 * Comparison
 *
 * @param  {Integer} args...
 *
 * @return {Boolean}
 */

Template.registerHelper('greater', function(/* args... */) {
  // Ignore the last argument because it contains a Spacebars specific object.
  return arguments[0]>arguments[1];
});


/**
 * Comparison
 *
 * @param  {Integer} args...
 *
 * @return {Boolean}
 */

Template.registerHelper('equal', function(/* args... */) {
  // Ignore the last argument because it contains a Spacebars specific object.
  return arguments[0]==arguments[1];
});


/**
 * Checks if the String is empty or not
 *
 * @param  {Integer} args...
 *
 * @return {Boolean}
 */

Template.registerHelper('notEmpty', function(/* args... */) {
  // Ignore the last argument because it contains a Spacebars specific object.
  return arguments[0].length > 0;
});


/**
 * Checks if the current page is any of the pages provided as arguments.
 */
Handlebars.registerHelper('activePage', function(/* args... */) {
  // includes Spacebars.kw but that's OK because the route name ain't that.
  var routeNames = arguments;

  return _.include(routeNames, Router.current().route.getName()) && 'active';
});
