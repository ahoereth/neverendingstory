// Paragraph controller.

/****************************************************************************/
/* Paragraph HELPERS */
/****************************************************************************/
Template.paragraph.helpers({

  /**
   * Checks if the paragraph is hidden.
   */
  isHidden: function() {
    return ! this.initial && ! this.elected;
  },


  /**
   * Checks if the current user is allowed to delete the paragraph.
   */
  canDelete: function() {
    return this.voteCount === 0 && ! this.elected &&
           this.author == Meteor.userId();
  }

});



/****************************************************************************/
/* Paragraph EVENTS */
/****************************************************************************/
Template.paragraph.events({

  /**
   * Up-/downvote the current paragraph.
   */
  'click .vote': function() {
    if (! Meteor.userId())
      return;

    Meteor.call('components/vote', this._id);
  },


  /**
   * Only visible as long as a component does not have any votes.
   */
  'click .remove': function(e, tmpl) {
    if (this.author != Meteor.userId())
      return;

    Meteor.call('components/remove', this._id);
  }

});
