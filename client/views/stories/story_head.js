// Story Head controller.

/****************************************************************************/
/* Story Head HELPERS */
/****************************************************************************/
Template.story_head.helpers({
  /**
   * Shows some random people who liked this story with links to their profile.
   *
   * TODO: Should probably focus on people the current user follows and not
   * take the current user into account.
   */
  voters: function() {
    var profilelink = function(username) {
      return '<a class="view-profile" href="/profile/'+username+'">'+username+'</a>';
    };

    var sample = _.sample(this.votes, 5), self, first;
    return _.map(sample, function(vote, idx) {
      self = vote._id == Meteor.userId();
      first = idx === 0;

      return _.extend(vote, {
        anchor: profilelink(self ? (first ? 'You' : 'you') : vote.username),
        prelast: (idx === sample.length-2),
        last: (idx === sample.length-1)
      });
    });
  },


  /**
   * Did the current user vote for this story?
   */
  iLiked: function() {
    return !! _.findWhere(this.votes, {_id: Meteor.userId()});
  },


  /**
   * Checks if we are currently just viewing this single story.
   */
  isSingle: function() {
    var current = Router.current();
    return current.route.getName() == 'story' && current.params._id == this._id;
  }
});



/****************************************************************************/
/* Story Head EVENTS */
/****************************************************************************/
Template.story_head.events({

  /**
   * Sets the story to 'deleted' if the current user is its author.
   */
  'click .delete': function() {
    if ( ! Meteor.userId() || this.creator != Meteor.userId() )
      return;

    Stories.update(this._id, {$set: {deleted: true}});
  },


  /**
   * Removes or adds the current user's vote from the story's votes
   */
  'click .vote': function() {
    if ( ! Meteor.userId() )
      return;

    // Trigger the vote. Method decides if + or -.
    Meteor.call('stories/vote', this._id);
  }

});
