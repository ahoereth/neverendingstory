(function() {
  // Paragraph template controls.

  /**
   * Shows the next sibling component of the provided component.
   *
   * NOTE: This is ugly.. There should be a nicer way to do this.
   *
   * @param {Component} t
   */
  var showNext = function(t) {
    var $next = $('#'+t._id).slideUp().next();
    if ( $next.length === 0 ) {
      $next = $('#'+t._id).parent('div').children().first();
    }

    $next.slideDown();
  }



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
     * Checks if the current user is the paragraph's author.
     */
    isAuthor: function() {
      return this.author == Meteor.userId();
    },


    /**
     * Checks if the current user is allowed to delete the paragraph.
     */
    canDelete: function() {
      return this.author == Meteor.userId() &&
             this.voteCount == 0 && ! this.elected;
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
    'click .next': function() {
      //Meteor.subscribe('components', this.story, this.priority);
      showNext(this);
    },


    /**
     * Only visible as long as a component does not have any votes.
     */
    'click .remove': function() {
      if ( this.author != Meteor.userId() )
        return;

      showNext(this);
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

})();
