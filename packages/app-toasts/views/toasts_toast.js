// toast template controls.

// ************************************************************************** //
// EVENTS
Template.toasts_toast.events({

  // hide the toast when the kill button or the action link is clicked
  'click .toast-kill, click a': function(e, tmpl) {
    Toasts.remove(this.identifier);
  }

});
