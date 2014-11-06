// Join controller.

/****************************************************************************/
/* Join EVENTS */
/****************************************************************************/
Template.join_form.events({

  /**
   * Either registers a new user or logs an existing user in.
   *
   * NOTE: Another conisderation for this was to not have the user decide
   *       between "login" or "signup" but decide so automatically depending
   *       on if the username already exists or not. I decided against this
   *       because it might feel for the user to be able to sign in as before
   *       after he maybe just deleted his account. Therefor I opted for a
   *       Amazon.com like layout with a radio selection.
   *
   * TODO: Error handling.
   */
  'submit form': function(e, tmpl) {
    handleNaturally(e);

    // Get the form data.
    var form = tmpl.$(e.target);
    var fields = parseForm(form);

    // Check for empty fields. User is notified using ParsleyJS
    if (! fields.do || ! fields.username || ! fields.password)
      return;

    var username = fields.username;
    var password = fields.password;

    // Login.
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

    // Register.
    } else { // if (fields.do == 'signup') {
      Accounts.createUser({
        username: username,
        password: password,
        email   : fields.email || undefined // optional
      }, function(err) {
        if (err) {
          alert(err.reason);
        }
      });
    }
  }

});




/****************************************************************************/
/* Join RENDERED */
/****************************************************************************/
Template.join_form.rendered = function() {
  this.$('form').parsley({trigger: 'change'});
};
