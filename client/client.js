// General client side initialization code.

// Get information about currently active users.
Meteor.subscribe('activeUsers');

// DOM is ready.
Meteor.startup(function() {

  // Watch the current user's document on the client side and update dependend
  // documents in other collections when it changes.
  Meteor.users.find(Meteor.userId()).observeChanges({

    /**
     * Called when the current user's document changes.
     *
     * @param  {String} id
     * @param  {Object} fields Changed fields. If fields were removed from the
     *                         document they arrive here set to 'undefined'.
     */
    changed: function(id, fields) {
      // Update avatar in messages. Checking for "undefined" using '_.has'.
      if (fields.profile && _.has(fields.profile, 'avatar')) {

        // TODO: Meteor bug: setTimeout required. Report filed, will contribute.
        // https://github.com/meteor/meteor/issues/907
        // http://stackoverflow.com/questions/18645334
        setTimeout(function() {
          Meteor.call('server/messages/updateFrom', {
            avatar: fields.profile.avatar || '' // undefined: set to empty string
          });
        });
      }
    }
  });

});
