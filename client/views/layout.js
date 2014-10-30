// General layout controller.

/****************************************************************************/
/* Layout HELPERS */
/****************************************************************************/
Template.layout.helpers({

  /**
   * Checks if the paragraph has siblings.
   */
  attributes: function() {
    var classes = [];

    var currentRoute = Router.current();
    if (currentRoute) {
      var route = currentRoute.route.getName();
      if (route) {
        classes.push('tmpl-' + route);
      }
    }

    return classes ? {class: classes.concat(' ')} : null;
  }

});
