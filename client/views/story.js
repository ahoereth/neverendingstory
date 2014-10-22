(function() {
  // Story template controls.

  /****************************************************************************/
  /* Story HELPERS */
  /****************************************************************************/
  Template.story.helpers({

    /**
     * Expose the stories content to the view.
     */
    paragraphs: function() {
      return Components.find({
        story: this._id,
        type: 'paragraph',
        elected: true
      }, {
        sort: {priority: 1}
      });
    },


    /**
     * Expose the set of next paragraph components to the view. Meaning
     * all the components of which the users can elect a new paragraph.
     */
    nextParagraph: function() {
      var prevComponent = Components.findOne({
        story: this._id,
        elected: true
      }, {sort: {priority: -1}});
      var priority = getNewPriority(prevComponent);

      var paragraphs = Components.find({
        story: this._id,
        priority: priority
      }, {sort: {voteCount: -1}}).fetch();

      // Show the first one.
      if ( paragraphs.length ) {
        paragraphs[0].initial = true;
      }

      return paragraphs;
    }

  });

})();
