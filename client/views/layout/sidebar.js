// Sidebar controller.


Template.sidebar.events({
  'mouseover .sidebar': function(e, tmpl) {
    tmpl.$(e.target).addClass('active');
  },

  'mouseout .sidebar': function(e, tmpl) {
    tmpl.$(e.target).removeClass('active');
  }
});


Template.sidebar.rendered = function(tmpl) {

}
