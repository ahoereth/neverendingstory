// Stories controller.

/****************************************************************************/
/* Stories HELPERS */
/****************************************************************************/
Template.stories.helpers({

  /**
   * Expose the stories to the view.
   */
  stories: function() {
    return Stories.find();
  }

});