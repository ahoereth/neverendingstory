// New Story controller.

/****************************************************************************/
/* New Story EVENTS */
/****************************************************************************/
Template.story_new.events({

  /**
   * New Story form submission.
   */
  'submit form': function(e, tmpl) {
    handleNaturally(e);

    // Only logged in users can create new stories.
    if ( ! Meteor.userId() )
      return;

    // Get form data.
    var form = tmpl.$(e.target);
    var fields = parseForm(form);

    // Stories require a non empty title!
    if ( ! fields.title.length )
      return;

    // Create new story. Due to the true the client is instantly redirected
    // to the new route. When the callback is fired the story was created
    // on the server and we check if the path still is correct (the server
    // might have changed the _id) and redirect the client if appropriate.
    Meteor.call('stories/new', {
      title   : fields.title,
      preface : fields.preface,
      redirect: true
    }, function(err, _id) {
      var current = Router.current();
      var desired = Router.routes['story'].path({_id: _id});
      if ( current.url != desired ) {
        Router.go(desired);
      }
    });

    // Reset form using a native JS function.
    form[0].reset();
  }

});



/****************************************************************************/
/* New Story RENDERED */
/****************************************************************************/
Template.story_new.rendered = function() {
  // The textarea should be automatically resized in height in order to
  // accomodate short and long prefaces alike.
  this.$('textarea').autosize();
};
