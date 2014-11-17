// Global Components collection manipulation methods.
// Documentation: http://docs.meteor.com/#methods_header

Meteor.methods({

  /**
   * Creates a new paragraph for a specific story.
   *
   * @param {Object} args
   *        	{String} story_id
   *        	{String} content
   *        	{Number} priority Optional, when not provided the priority is
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
    // Defines the nextElectionDate and therefore starts the countdown
    if(Components.find({'priority': args.priority}).fetch().length == 2){
      var countdown = Stories.findOne(args.story).countdown;
      Stories.update(args.story, {
        $push: {nextElectionDate: Date.now() + countdown}
      });
    }

    return _id;
  },


  /**
   * Removes a component. In the final product this will most likely be changed
   * to a property deleted being set to true.
   *
   * @param {String} _id
   */
  'components/remove': function(_id) {
    check(_id, MeteorID);

    var component = Components.findOne(_id);
    check(component.author, this.userId);

    Components.remove(_id);

    // Remove the nextElectionDate if there is only one paragraph left
    if(Components.find({'priority': component.priority}).fetch().length == 1){
      Stories.update(args.story, {
        $unset: {nextElectionDate: ""}
      });
    }
  },


  /**
   * Up- or downvotes a component. Upvotes if the user did not vote before,
   * downvotes otherwise.
   *
   * @see 'stories/vote' sister method
   *
   * @param {String} _id
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

     // Update users vote for the component
      Meteor.users.update(this.userId,{
        $push: { votedPar:_id,votedDate:$currentDate},
      });


    } else {
      // User did vote for this component before.
      // Pull his _id and decrement the vote counter.
      Components.update(_id, {
        $pull: {votes: this.userId},
        $inc : {voteCount: -1}
      });

      // Pull user's vote for the component
      Meteor.users.update(this.userId,{
        $push: { votedPar:_id,votedDate:$currentDate},
      });

    }
  },


  /**
   * Elects a component. Works only in debug mode!
   *
   * @param {String} _id
   */
  'components/elect': function(_id) {
    if (! this.isSimulation && ! isDebug())
      return false;

    check(this.userId, MeteorID);
    check(_id, MeteorID);
    // Store the countdown time used for the election of this paragraph
    var storyid = Components.findOne(_id).story;
    var countdown = Stories.findOne(storyid).countdown;

    Components.update(_id, {
      $set: {
          elected: true,
          countdown: countdown,
          electedDate: Date.now()
        }
    });

    // Change the countdown time for the next election
    var priority = Components.findOne(_id).priority;
    setNewCountdown(storyid, priority);
  }

});
