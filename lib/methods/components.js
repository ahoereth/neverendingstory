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
      createdAt: currentDate()
    });

    // Insert an activity which is adding new paragraph
     Activities.insert({
      user_id     : this.userId,
      target_id   : _id,
      action_type : Activities.ActivityType.creatingParagraph,
      deleted: false,
      createdAt   : currentDate()
    });

    // Defines the nextElectionDate and therefore starts the countdown. Only
    // fired on the server.
    var story =  Stories.findOne(args.story), currentParagraphs = Components.find({story: args.story, 'priority': args.priority});
    if(!this.isSimulation && currentParagraphs.count() > 1 && _.isUndefined(story.nextElectionDate)) {
      var countdown = story.countdown;
      Stories.update(args.story, {
        $set: {nextElectionDate: currentDate(countdown)}
      });
      Meteor.call('stories/watchNextElection');
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
    var story = Stories.findOne(component.story), currentParagraphs = Components.find({story: component.story, 'priority': component.priority});

    // Remove the nextElectionDate if there is only one paragraph left
    if(currentParagraphs.count() < 2 && !_.isUndefined(story.nextElectionDate)){
      Stories.update(component.story, {
        $unset: {nextElectionDate: ""}
      });
      Meteor.call('stories/watchNextElection');
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

      var activityAlready=Activities.find({user_id:this.userId,target_id: _id,action_type : 4}).fetch();

      if(activityAlready.length==0){
          Activities.insert({
            user_id     : this.userId,
            target_id   : _id,
            action_type : Activities.ActivityType.votingComp,
            deleted: false,
            createdAt   : currentDate()
          });
        }
        else{

          Activities.update({user_id:this.userId,target_id: _id,action_type: Activities.ActivityType.votingComp}, {$set:{deleted:false,createdAt:currentDate()}});
        }
    } else {
      // User did vote for this component before.
      // Pull his _id and decrement the vote counter.
      Components.update(_id, {
        $pull: {votes: this.userId},
        $inc : {voteCount: -1}
      });

      Activities.update({user_id:this.userId,target_id: _id,action_type: Activities.ActivityType.votingComp}, {$set:{deleted:true,deletedAt:currentDate()}});
    }
  }

});
