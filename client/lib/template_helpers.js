// Template helper functions.

/**
 * Checks if the current visitor is logged in.
 */
Template.registerHelper('isLoggedin', function() {
  return Meteor.userId() ? true : false;
});
