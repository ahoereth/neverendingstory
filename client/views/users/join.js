// Join controller.
// NOTE: Most of the stuff from here moved to the join_form. The actions here
// probably should be moved to the users profile page or to a more general
// controller.

Template.join.events({

  /**
   * Logout.
   */
  'click .logout': function(e, tmpl) {
    Meteor.logout();
  }

});
