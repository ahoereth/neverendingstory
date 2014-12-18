// Stories collection server side handling. Publishing and security rules.

/******************************************************************************/
/* Stories PUBLISHING */
/******************************************************************************/
Meteor.publish('stories', function(id) {
  check(id, Match.Optional(MeteorID));

  if ( ! _.isUndefined(id) ) {
    return Stories.find(id);
  } else {
    return Stories.find({
      deleted: {$ne: true},
      createdAt: {$exists: true}
    }, {
      sort: {voteCount: -1}
    });
  }
});

Meteor.publish('featuredStories', function() {
  return Stories.find({
    deleted: {$ne: true},
    createdAt: {$exists: true}
  }, {
    limit: 5,
    sort: {
      activity: -1,
      voteCount: -1
    }
  });
});



/******************************************************************************/
/* Stories ALLOW-RULES */
/******************************************************************************/
Stories.allow({

  /**
   * Story insert.
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
   * Story update.
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
   * Story remove.
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
