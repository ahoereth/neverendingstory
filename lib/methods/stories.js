// Global Stories collection manipulation methods.
// Documentation: http://docs.meteor.com/#methods_header

// Variable which holds the identifier of the currently pending next
// story election timeout. See 'stories/watchNextElection' method below.
var nextElectionTimeout;


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
      createdAt: currentDate(),
      countdown: 60000, //259200000 // We start with a countdown of 3 days
      activity: 0
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
      createdAt: currentDate()
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
  },

  /**
   * Finds the story which has its election upcoming next and triggers this
   * election when the time has come.
   */
  'stories/watchNextElection': function() {
    if (this.isSimulation)
      return false;

    // Stop old timeout.
    clearTimeout(nextElectionTimeout);

    // Get the story which has its election upcoming next.
    var story = Stories.findOne({
      nextElectionDate: {$exists: true}
    }, {
      sort : {nextElectionDate: 1}
    });

    if (! story)
      return false;

    // Calculate the time in milliseconds until the election is due.
    var electionDate = new Date(story.nextElectionDate);
    var timeleft = new Date(electionDate - Date.now()).getTime();

    if (timeleft < 0)
      timeleft = 0;

    function setNewCountdown(story, electedParagraph){
      // We count the number of people active on the story by using votes
      // var fetched = [{votes: ['a', 'b', 'c']}, {votes: ['a']}, {votes: ['d']}];
      //var nbUniqueUsers = _(fetched).pluck('votes').reduce(function(memo, votes) { return _.union(memo, votes); }).length;

      // then compare to previous activity and calculate the changeCountdown

      var changeCountdown = -10000, limitBottom = 10000, limitTop = 259200000;
      var newCountdown = story.countdown + changeCountdown;
      if(newCountdown < limitBottom || newCountdown > limitTop)
        changeCountdown = 0;

      // Set the activity of the electedParagraph as the previous activity and the activity of the story as the current activity
      Stories.update(story._id, {
        $unset: {nextElectionDate: ""},
        $inc: {countdown: changeCountdown}
      });
    }

    // Start new timeout.
    nextElectionTimeout = Meteor.setTimeout(function() {
      var electedParagraph = Components.findOne({story : story._id}, {sort: {priority : -1, voteCount : -1}, limit : 1});
      Components.update(electedParagraph._id, {
        $set : {elected: true}
      });
      // We should calculate the new countdown time depending on the activity at the
      // previous elections using the priority to measure the paragraphs and votes
      setNewCountdown(story, electedParagraph);

      Meteor.call('stories/watchNextElection');
    }, timeleft);

  }

});
