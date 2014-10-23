// Global Components collection manipulation methods.
// Documentation: http://docs.meteor.com/#methods_header

Meteor.methods({

  /**
   * Creates a new paragraph for a specific story.
   *
   * @param {MeteorID} story_id
   * @param {String}   content
   * @param {Number}   priority Optional, when not provided the priority is
   *                            calculated from the last elected paragraph of
   *                            this story.
   */
  'paragraphs/new': function(args) {
    check(this.userId, MeteorID);
    check(args, {
      story   : MeteorID,
      content : NonEmptyString,
      priority: Match.Optional(PositiveNumber)
    });

    // No priority passed. Calculate a new one from the last elected component.
    if ( _.isUndefined(args.priority) ) {
      // Get last elected component.
      var prev = Components.findOne({
        story  : args.story,
        type   : 'paragraph',
        elected: true
      }, {
        sort: {priority: -1}
      });

      // Calculate priority.
      args.priority = getNewPriority(prev);
    }

    // Insert paragraph component into database.
    var _id = Components.insert({
      author   : this.userId,
      content  : args.content,
      story    : args.story,
      priority : args.priority,
      type     : 'paragraph',
      elected  : false,
      voteCount: 0,
      votes    : [],
      created  : Date.now()
    });

    return _id;
  },


  /**
   * Removes a component. In the final product this will most likely be changed
   * to a property deleted being set to true.
   *
   * @param {MeteorID} id
   */
  'components/remove': function(_id) {
    check(_id, MeteorID);

    var component = Components.findOne(_id);
    check(component.author, this.userId);

    Components.remove(_id);
  },


  /**
   * Up- or downvotes a component. Upvotes if the user did not vote before,
   * downvotes otherwise.
   *
   * @see 'stories/vote' sister method
   *
   * @param {MeteorID} _id
   */
  'components/vote': function(_id) {
    check(this.userId, MeteorID);
    check(_id, MeteorID);

    var component = Components.findOne(_id);
    if ( -1 === _.indexOf(component.votes, this.userId) ) {
      // User did not vote for this cpmponent before.
      // Push his _id and increment the vote counter.
      Components.update(_id, {
        $push: {votes: this.userId},
        $inc : {voteCount: 1}
      });
    } else {
      // User did vote for this component before.
      // Pull his _id and decrement the vote counter.
      Components.update(_id, {
        $pull: {votes: this.userId},
        $inc : {voteCount: -1}
      });
    }
  },


  'components/elect': function(_id) {
    check(this.userId, MeteorID);
    check(_id, MeteorID);

    Components.update(_id, {
      $set: {elected: true}
    });
  }

});
