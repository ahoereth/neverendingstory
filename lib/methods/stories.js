// Global Stories collection manipulation methods.
// Documentation: http://docs.meteor.com/#methods_header

// Variable which holds the identifier of the currently pending next
// story election timeout. See 'stories/watchNextElection' method below.
var nextElectionTimeout;


/**
* Calculates the new countdown value.
*
* @param {Number} countdown
* @param {Number} previousActivity
* @param {Number} newActivity
*/
function newCountdown(countdown, previousActivity, newActivity) {
  var activityChange = newActivity - previousActivity;
  countdown -= Stories.COUNTDOWN.distortion * activityChange;

  if (countdown < Stories.COUNTDOWN.min) {
    countdown = Stories.COUNTDOWN.min;
  } else if (countdown > Stories.COUNTDOWN.max) {
    countdown = Stories.COUNTDOWN.max;
  }

  return countdown;
}


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
      genre   : String,
      genre2  : String,
      nsfw    : String,
      insp    : String,
      who     : String,
      when    : String,
      where   : String,
      what    : String,
      preface : String,
      redirect: Match.Optional(Boolean)
    });

    // Insert story into server database.
    var _id = Stories.insert({
      creator: this.userId,
      title  : args.title,
      genre   : args.genre,
      genre2  : args.genre2,
      nsfw    : args.nsfw,
      insp    : args.insp,
      who     : args.who,
      when    : args.when,
      where   : args.where,
      what    : args.what,
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

    Activities.insert({
     user_id     : this.userId,
     target_id   : _id,
     action_type : Activities.ActivityType.creatingStory,
     deleted: false,
     createdAt   : currentDate()
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
    if (! _.findWhere(story.votes, {_id: this.userId}) ) {
      // User did not vote for this story before.
      // Push his _id and increment the vote counter.
      Stories.update(_id, {
        $push: {votes: {
          _id: this.userId,
          username: Meteor.user().username
        }},
        $inc: {voteCount: 1}
      });

      // TODO: Create an activity for voting.
    } else {
      // User did vote for this story before.
      // Pull his _id and decrement the vote counter.
      Stories.update(_id, {
        $pull: {votes: {_id: this.userId}},
        $inc : {voteCount: -1}
      });

      // TODO: Create an activity for unvoting.
    }
  },


  /**
   * Finds the story which has its election upcoming next and triggers this
   * election when the time has come.
   */
  'stories/watchNextElection': function() {
    if (this.isSimulation) {
      return false;
    }

    // Stop old timeout.
    Meteor.clearTimeout(nextElectionTimeout);

    // Get the story which has its election upcoming next.
    var story = Stories.findOne({
      nextElectionDate: {$exists: true}
    }, {
      sort : {nextElectionDate: 1}
    });

    if (! story) {
      return false;
    }

    // Calculate the time in milliseconds until the election is due.
    var electionDate = new Date(story.nextElectionDate).getTime();
    var timeleft = new Date(electionDate - Date.now()).getTime();
    timeleft = timeleft > 0 ? timeleft : 0;

    // Start new timeout.
    nextElectionTimeout = Meteor.setTimeout(function() {
      var elected = Components.findOne({story: story._id}, {
        sort: {priority: -1, voteCount: -1}
      });

      // Get all competing paragraphs.
      var competing = Components.find({
        story: story._id,
        priority: elected.priority
      }).fetch();

      // Get the number of users who were active in this election round.
      var activity = _(competing).reduce(function(memo, component) {
        return _.union(memo, component.votes);
      }, []).length;

      // Get the 3 previously elected paragraphs of this story.
      var previous = Components.find({
        story: story._id,
        elected: true,
        activity: {$exists: true}
      }, {
        limit: 3
      }).fetch();

      // Get the average activity in the last some elections.
      var previousActivity = _(previous).reduce(function(memo, component) {
        return memo + (component.activity || memo);
      }, 0) / (previous.length ? previous.length : 1);

      // Update countdown depending on the change of activity.
      // Change of activity depends on the change in activity during the
      // last couple of elections in comparision to the current election.
      var oldCountdown = story.countdown || Stories.COUNTDOWN.init;
      var countdown = newCountdown(oldCountdown, previousActivity, activity);

      // Elect component.
      Components.update(elected._id, {$set : {
        elected: true,
        countdown: oldCountdown,
        activity: activity
      }});

      // Election for this story is done for now. Unset the upcoming election
      // date, remember the now last activity and save the new countdown for
      // the next election.
      Stories.update(story._id, {
        $unset: {nextElectionDate: ''},
        $set: {
          activity: activity,
          countdown: countdown
        }
      });

      // Start waiting for the globally next election - this is most likely an
      // election in a different story.
      Meteor.call('stories/watchNextElection');
    }, timeleft);
  }

});
