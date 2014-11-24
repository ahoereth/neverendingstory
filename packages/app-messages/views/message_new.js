// New Message contoller.

/****************************************************************************/
/* Message New EVENTS */
/****************************************************************************/
Template.message_new.events({

  /**
   * Listen for keypresses in the textare.
   * When STRG+ENTER is pressed submit the form.
   */
  'keypress textarea': function(e, tmpl) {
    // CTRL + ENTER
    if (e.ctrlKey && e.charCode == 10) {
      tmpl.$('form').submit();
    }
  },


  /**
   * Add message to messages collection when the form is submitted.
   */
  'submit form': function(e, tmpl) {
    handleNaturally(e);

    // Check if template is used correctly. TODO: The 'scope' and 'to'
    // requirement is actually ugly, maybe this can be enhanced somehow.
    if (tmpl.data.scope && tmpl.data.scope != 'public' && !tmpl.data.to) {
      console.error('The message_new template is used in a not "public" scope '+
        'but does not have a "to" property set.');
      return;
    }

    var $form  = tmpl.$(e.target);
    var fields = parseForm($form);

    // Return if there is no text.
    if (! fields.content)
      return;

    // Create new message.
    Meteor.call('messages/new', {
      content: fields.content,
      scope  : tmpl.data.scope || 'public', // {public, story, component, private}
      to     : tmpl.data.to || undefined
    });

    // Reset form.
    $form.trigger('reset');

    // Reselect textarea for quickly typing the next message.
    $form.find('textarea').select();
  }
});
