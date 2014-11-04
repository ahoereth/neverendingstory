// Join controller.

/****************************************************************************/
/* Join EVENTS */
/****************************************************************************/
Template.join.events({

  'submit .join': function(e, tmpl) {
    handleNaturally(e);

    // Get the form data.
    var form = tmpl.$(e.target);
    var fields = parseForm(form);

    // Check for empty fields. User is notified using ParsleyJS
    if (! fields.do || ! fields.username || ! fields.password)
      return;

    var username = fields.username;
    var password = fields.password;

    if (fields.do == 'login') {
      Meteor.loginWithPassword(username, password, function(err) {
        console.log(err);
        if (err) {
          alert(err.reason);
          if (err.reason == 'User not found') {
          } else if (err.reason == 'Incorrect password') {
          }
        }
      });
    } else { // if (fields.do == 'signup') {
      Accounts.createUser({
        username: username,
        password: password,
        email   : fields.email || undefined
      }, function(err) {
        if (err) {
          alert(err.reason);
        }
      });
    }
  },


  'click .logout': function(e, tmpl) {
    Meteor.logout();
  }

});




/****************************************************************************/
/* Join RENDERED */
/****************************************************************************/
Template.join.rendered = function() {
  this.$('.join').parsley({trigger: 'change'});
};
