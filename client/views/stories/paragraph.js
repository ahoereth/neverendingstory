// Paragraph controller.

/**
 * Shows the next sibling component of the provided component.
 *
 * NOTE: This is ugly.. There should be a nicer way to do this.
 *
 * @param {Component} t
 */
var showNext = function(tmpl) {
  // Get and hide current paragraph.
  var $current = tmpl.$(tmpl.firstNode).slideUp();

  // Get next paragraph.
  var $next = $current.next();
  if ( $next.length === 0 ) {
    $next = $current.parent('div').children().first();
  }

  // Show next paragraph.
  $next.slideDown();
};



/****************************************************************************/
/* Paragraph HELPERS */
/****************************************************************************/
Template.paragraph.helpers({

  /**
   * Checks if the paragraph has siblings.
   */
  hasSibling: function() {
    var next = Components.findOne({
      story: this.story,
      priority: this.priority,
      _id: {$ne: this._id}
    });

    return next ? true : false;
  },


  /**
   * Checks if the paragraph is hidden.
   */
  isHidden: function() {
    return !this.initial && !this.elected;
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
    if ( ! Meteor.userId() )
      return;

    // This method automatically decides if the paragraph should be up
    // or down voted.
    Meteor.call('components/vote', this._id);
  },


  /**
   * Show next sibling paragraph. Mainly relevant for the last paragraph of
   * a story.
   */
  'click .next': function(e, tmpl) {
    //Meteor.subscribe('components', this.story, this.priority);
    showNext(tmpl);
  },


  /**
   * Only visible as long as a component does not have any votes.
   */
  'click .remove': function(e, tmpl) {
    if ( this.author != Meteor.userId() )
      return;

    showNext(tmpl);
    Meteor.call('components/remove', this._id);
  },


  /**
   * Force adds a vote. The normal voting system only allows one vote per
   * user.
   *
   * NOTE: Just for testing purposes! Needs debugging mode.
   */
  'click .voteX': function() {
    Components.update(this._id, {
      $inc: {voteCount: 1}
    });
  },


  /**
   * Force elects a paragraph.
   *
   * NOTE: Just for testing purposes. Needs debugging mode.
   */
  'click .elect': function() {
    //Meteor.call('electComponent', this._id);
    Components.update(this._id, {
      $set: {elected: true}
    });
  }

});
