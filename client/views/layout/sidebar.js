// Sidebar controller.


Template.sidebar.events({
  'mouseenter .sidebar': function(e, tmpl) {
    tmpl.$(e.target).addClass('active');
  },

  'mouseleave .sidebar': function(e, tmpl) {
    tmpl.$(e.target).removeClass('active');
  }
});


Template.sidebar.rendered = function(tmpl) {

}
