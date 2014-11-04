// New Paragraph controller.

/****************************************************************************/
/* New Paragraph EVENTS */
/****************************************************************************/
Template.paragraph_new.events({

  /**
   * New paragraph form submission.
   */
  'submit .new_paragraph': function(e, tmpl) {
    handleNaturally(e);

    // Only loggedin users can create new paragraphs.
    if ( ! Meteor.userId() )
      return;

    // Get the form data.
    var form = tmpl.$('form');
    var fields = parseForm(form);
    
    // Paragraphs require some content!
    if ( ! fields.content.length )
      return;

    Meteor.call('paragraphs/new', {
      story  : this._id,
      content: fields.content
    });

    // Reset form using a native JS function.
    form[0].reset();
  }

});



/****************************************************************************/
/* New Paragraph RENDERED */
/****************************************************************************/
Template.paragraph_new.rendered = function() {
  this.$('textarea').autosize();
};
