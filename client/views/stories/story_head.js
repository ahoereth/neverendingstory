// Story Head controller.

/****************************************************************************/
/* Story Head HELPERS */
/****************************************************************************/
Template.story_head.helpers({

  /**
   * Shows the stories vote count or 0.
   */
  theVoteCount: function() {
    return this.voteCount || '0';
  },



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
  'click .votes': function() {
    if ( ! Meteor.userId() )
      return;

    // Trigger the vote. Method decides if + or -.
    Meteor.call('stories/vote', this._id);
  }

});
