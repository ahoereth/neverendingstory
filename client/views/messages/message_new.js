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

    console.log(tmpl);

    var $form  = tmpl.$(e.target);
    var fields = parseForm($form);

    // Return if there is no text.
    if (! fields.content)
      return;

    if (tmpl.data.scope && tmpl.data.scope != 'public' && !tmpl.data.to) {
      console.error('No "to" set for the message_new template');
      return;
    }

    var args = {
      content: fields.content,
      scope  : tmpl.data.scope || 'public' // {public, story, component, private}
    };

    if (tmpl.data.to) {
      args.to = tmpl.data.to;
    }

    Meteor.call('messages/new', args);
      //to : undefined, // id of story, component or user

    $form.trigger('reset');
    $form.find('textarea').select();
  }
});
