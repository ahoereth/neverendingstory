(function() {
  // Components collection server side handling. Publishing and security rules.

  /****************************************************************************/
  /* Components PUBLISHING */
  /****************************************************************************/
  Meteor.publish('components', function (story_id, priority) {
    check(story_id, Match.Optional(MeteorID));
    check(priority, Match.OneOf(PositiveNumber, String, undefined));

    if ( ! _.isUndefined(story_id) ) {

      if ( ! _.isUndefined(priority) ) {
        if ( 'latest' == priority ) {
          var max = Components.findOne({
            story: story_id
          }, {
            sort: {priority: -1}
          });
        priority = max ? max.priority || 1 : 1;
        }

        return Components.find({
          story: story_id,
          priority: priority
        });
      } else {
        return Components.find({story: story_id});
      }
    } else {
      return Components.find();
    }
  });



  /****************************************************************************/
  /* Components ALLOW-RULES */
  /****************************************************************************/
  Components.allow({

    /**
     * Component insert.
     *
     * @param  {String}  userId User performing the request.
     * @param  {Object}  doc    Document to be inserted into the database.
     * @return {Boolean}
     */
    insert: function(userId, doc) {
      return false;
    },


    /**
     * Component update.
     *
     * @param  {String}  userId    User performing the request.
     * @param  {Object}  doc       Document from the database to be changed.
     * @param  {Array}   fields    Fields which are about to be changed.
     * @param  {Object}  modifiers Mongo modifiers object ($set, $push etc.)
     *                             to be applied.
     * @return {Boolean}
     */
    update: function(userId, doc, fields, modifiers) {
      if ( debugging() )
        return true;

      return false;
    },


    /**
     * Component remove.
     *
     * @param  {String}  userId User performing the request.
     * @param  {Object}  doc    Document from the database to be deleted.
     * @return {Boolean}
     */
    remove: function(userId, doc) {
      return false;
    }

  });

})();
