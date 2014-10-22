// New Paragraph controller.

/****************************************************************************/
/* New Paragraph EVENTS */
/****************************************************************************/
Template.paragraph_new.events({

  /**
   * New paragraph form submission.
   */
  'submit form': function(e, tmpl) {
    handleNaturally(e);

    // Only loggedin users can create new paragraphs.
    if ( ! Meteor.userId() )
      return;

    // Get the form data.
    var form = tmpl.find('form');
    var fields = parseForm(form);

    // Paragraphs require some content!
    if ( ! fields.content.length )
      return;

    Meteor.call('paragraphs/new', {
      story  : this._id,
      content: fields.content
    });

    // Reset form.
    form.reset();
  }

});



/****************************************************************************/
/* New Paragraph RENDERED */
/****************************************************************************/
Template.paragraph_new.rendered = function() {
  $('textarea').autosize();
};
