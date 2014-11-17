// Messages collection server side handling. Publishing and security rules.

/******************************************************************************/
/* Messages PUBLISHING */
/******************************************************************************/
Meteor.publishComposite('messages', function (args) {
  args = args || {};

  check(args, {
    from : Match.Optional(MeteorID),
    to   : Match.Optional(MeteorID),
    scope: Match.Optional(String),
    limit: Match.Optional(Integer)
  });

  var selector = _.pick(args, 'from', 'to', 'scope');
  var options  = _.pick(args, 'limit');

  // Default limit.
  options.limit = selector.limit || 100;

  // We are always just interested in the most recent messages.
  options.sort = {created: -1};

  return {
    // Get the messages.
    find: function() {
      return Messages.find(selector, options);
    },
    children: [{
      // Get the authors profile for every message.
      find: function(message) {
        return Meteor.users.find(
          message.author,
          {
            limit : 1,
            fields: {
              username: 1,
              //avatar  : 1,
              status  : 1
            }
          }
        );
      }
    }]
  };

});



/******************************************************************************/
/* Messages ALLOW-RULES */
/******************************************************************************/
Messages.allow({

  /**
   * Message insert.
   *
   * @param  {String}  userId User performing the request.
   * @param  {Object}  doc    Document to be inserted into the database.
   * @return {Boolean}
   */
  insert: function(userId, doc) {
    if ( isDebug() )
      return true;

    return false;
  },


  /**
   * Message update.
   *
   * @param  {String}  userId    User performing the request.
   * @param  {Object}  doc       Document from the database to be changed.
   * @param  {Array}   fields    Fields which are about to be changed.
   * @param  {Object}  modifiers Mongo modifiers object ($set, $push etc.)
   *                             to be applied.
   * @return {Boolean}
   */
  update: function(userId, doc, fields, modifiers) {
    if ( isDebug() )
      return true;

    return false;
  },


  /**
   * Message remove.
   *
   * @param  {String}  userId User performing the request.
   * @param  {Object}  doc    Document from the database to be deleted.
   * @return {Boolean}
   */
  remove: function(userId, doc) {
    if ( isDebug() )
      return true;

    return false;
  }

});
