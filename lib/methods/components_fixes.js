/*    // Defines the nextElectionDate and therefore starts the countdown. Only
    // fired on the server.
    var story = Stories.findOne(args.story);
    var currentParagraphs = Components.find({
      story: args.story,
      priority: args.priority
    });

    if(! this.isSimulation && currentParagraphs.count() > 1 &&
       _.isUndefined(story.nextElectionDate)) {
      var countdown = story.countdown || Stories.COUNTDOWN.init;
      Stories.update(args.story, {
        $set: {nextElectionDate: currentDate(countdown)}
      });

      Meteor.call('stories/watchNextElection');
    }*/
