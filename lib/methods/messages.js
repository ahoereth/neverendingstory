// Global messages collection manipulation methods.
// Documentation: http://docs.meteor.com/#methods_header

Meteor.methods({

  /**
   * Creates a new message.
   *
   * @param {Object} args
   *        	{String} content
   *        	{String} scope
   *        	{String} to      (optional)
   */
  'messages/new': function(args) {
    check(this.userId, MeteorID);
    check(args, {
      content: NonEmptyString,
      scope  : Match.OneOf('public', 'story', 'component', 'private'),
      to     : Match.Optional(Match.OneOf(String, undefined))
    });

    var from = Meteor.user();

    var _id = Messages.insert({
      from   : {
        _id     : from._id,
        username: from.username,
        avatar  : from.profile.avatar || ''
      },
      to     : args.to || null,
      content: args.content,
      scope  : args.scope,
      created: Date.now()
    });

    return _id;
  },


  /**
   * Update the from data of all messages of the user calling this function.
   * This is primarily interesting on the server because the client will not
   * have all messages on hand right now. Required for denormalizing user data
   * into individual messages.
   *
   * @param {Object} args Currently only contains one field. 'avatar'
   */
  'server/messages/updateFrom': function(args) {
    check(this.userId, MeteorID);
    check(args, {
      avatar: String // can also be empty string
    });

    Messages.update({'from._id': this.userId}, {
      $set: {'from.avatar': args.avatar}
    });
  }

});
