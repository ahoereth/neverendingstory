// Global Stories collection manipulation methods.
// Documentation: http://docs.meteor.com/#methods_header

Meteor.methods({

  /**
   * Creates a new story.
   *
   * @param {String} title
   * @param {String} preface
   */
  'stories/new': function(args) {
    check(this.userId, MeteorID);
    check(args, {
      title   : NonEmptyString,
      preface : String,
      redirect: Match.Optional(Boolean)
    });

    // Insert story into server database.
    var _id = Stories.insert({
      creator: this.userId,
      title  : args.title,
      preface: args.preface, // Denormalized to reduce DB lookups.
      created: Date.now()
    });

    // Should we directly go to the route (and are on the client)?
    if ( args.redirect && this.isSimulation ) {
      Router.go('story', {_id: _id});
    }

    // Insert preface component into database.
    Components.insert({
      author : this.userId,
      content: args.preface,
      story  : _id,
      type   : 'preface',
      created: Date.now()
    });

    return _id;
  },


  /**
   * Up- or downvotes a story. Upvotes if the user did not vote before,
   * downvotes otherwise.
   *
   * @see 'components/vote' sister method
   *
   * @param {MeteorID} _id
   */
  'stories/vote': function(_id) {
    check(this.userId, MeteorID);
    check(_id, MeteorID);

    var story = Stories.findOne(_id);
    if ( -1 === _.indexOf(story.votes, this.userId) ) {
      // User did not vote for this story before.
      // Push his _id and increment the vote counter.
      Stories.update(_id, {
        $push: {votes: this.userId},
        $inc: {voteCount: 1}
      });
    } else {
      // User did vote for this story before.
      // Pull his _id and decrement the vote counter.
      Stories.update(_id, {
        $pull: {votes: this.userId},
        $inc : {voteCount: -1}
      });
    }
  }

});
