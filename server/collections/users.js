// Meteor.users collection server side handling.

/**
 * Publishs all currently active users to the client. All clients subscribe to
 * this on startup. Used for showing if the author of a message is currently
 * online.
 *
 * TODO: Use this to display currently active users and similar stuff.
 */
Meteor.publish('activeUsers', function() {
  return Meteor.users.find({
    'status.online': true
  }, {
    fields: {
      _id : 1,
      username: 1,
      'profile.avatar' : 1,
      'profile.followerNum' : 1,
      'profile.bio' : 1,
      'profile.followed' : 1,
      'status.online' : 1
    }
  });
});


Meteor.publish('profiles', function() {
  return Meteor.users.find({
  }, {
    fields: {
      _id : 1,
      username: 1,
      'profile.avatar' : 1,
      'profile.followerNum' : 1,
      'profile.bio' : 1,
      'profile.followed' : 1
    }
  });
});






/**
 * Modify user document on creation and validate data which might come from
 * an external source.
 *
 *
 * @param  {Object} options The data provided from the login service. Can also
 *                          contain data from Facebook or simillar - depends
 *                          on the provider used.
 * @param  {Object} user    The (server) generated user document.
 * @return {Object}         The modified user document.
 */
Accounts.onCreateUser(function(options, user) {
  // Ensure the user document has a profile object - even if it is empty.
  user.profile = options.profile || {};

  return user;
});




/******************************************************************************/
/* Meteor.users DENY-RULES */
/******************************************************************************/
Meteor.users.deny({

  /**
   * Meteor by default (only) allows users to modify the profile attribute of
   * their own document. We utilize methods for this so we can deny it.
   *
   * @see https://docs.meteor.com/#/full/meteor_userid
   *
   * @return {Boolean}
   */
  /*update: function () {
    if ( isDebug() )
      return false;

    return true;
  }*/

});




/******************************************************************************/
/* Meteor.users ALLOW-RULES */
/******************************************************************************/
Meteor.users.allow({

  update: function(userId, doc, fields, modifiers) {
    if ( isDebug() )
      return true;
      return false;
  },

});
