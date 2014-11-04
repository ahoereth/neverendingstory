// Global Stories collection manipulation methods.
// Documentation: http://docs.meteor.com/#methods_header

Meteor.methods({

  /**
   * Creates a new story.
   *
   * @param {String} title
   * @param {String} preface
   */
  'users/exists': function(args) {
    check(args, {
      username: NonEmptyString
    });

    if (Meteor.isServer) {
      var user = Meteor.users.findOne({
        username: args.username
      }, {
        reactive: false,
        fields: { username: 1 }
      });

      return !!user;
    }
  }

});
