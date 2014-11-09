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

    var _id = Messages.insert({
      from   : this.userId,
      to     : args.to || null,
      content: args.content,
      scope  : args.scope,
      created: Date.now()
    });

    return _id;
  }

});
