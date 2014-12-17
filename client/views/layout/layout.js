// General layout controller.

/****************************************************************************/
/* Layout HELPERS */
/****************************************************************************/
Template.layout.helpers({

  /**
   * Main container classes.
   */
  classes: function() {
    var classes = ['app', 'top'];

    if ( Session.get('menu-active') ) {
      classes.push('menu-active');
    }

    var currentRoute = Router.current();
    if (currentRoute) {
      var route = currentRoute.route.getName();
      if (route) {
        classes.push('tmpl-' + route);
      }
    }

    return classes ? {class: classes.join(' ')} : null;
  }

});




/****************************************************************************/
/* Layout RENDERED */
/****************************************************************************/
// View transitions are initialized here - the actual transitions are defined
// using css.
// TODO: Different transitions for different view changes (back, expand..).
Template.layout.rendered = function(tmpl) {
  this.$('.content div').first().addClass('view').css('left', 0);

  // This should be changed to -1 sometime depending on usage of the browser's
  // back or in-app back buttons.
  var direction = 1;

  // The duration in ms of the CSS transitions as defined in layout.less
  var cssTransitionDuration = 500;

  this.find(".content")._uihooks = {

    // Element insertion.
    insertElement: function(node, next) {
      var $node = $(node);
      var from = direction === 1 ? '-150%' : '150%';

      // Insert the node with it's initial CSS position into the DOM.
      $node
        .addClass('view')
        .css('left', from)
        .insertBefore(next);

      // We need to wait for a ms because the container needs to be inserted
      // on it's initial position before the CSS transition can kick in.
      setTimeout(function() {
        $node.css({
          left: 0,
          width: $node.parent().width() // required to suppress reflow..
        });
      }, 1); // Not zero.

      // Remove the fixed width again when the animation is finished so the
      // view reflows according to responsive CSS definitions.
      setTimeout(function() {
        $node.css('width', '');
      }, cssTransitionDuration+1); // 500 is the time of the transition in css.
    },

    // Element removal.
    removeElement: function(node) {
      var $node = $(node);
      var to = direction === 1 ? '150%' : '-150%';

      // Set the target position (animated using a CSS transition) and a fixed
      // width to suppress content reflow.
      $node.css({
        width: $node.width(),
        left: to
      });

      // When the transition is finished we remove the element from the DOM.
      setTimeout(function() {
        $node.remove();
      }, cssTransitionDuration);
    }
  };

  var yOffset, onTop = false;
  $(document).on('scroll', function(e) {
    yOffset = $(window).scrollTop();

    // using "onTop" as cache to not go into the DOM on every scroll update
    if (! onTop && yOffset < 50) {
      onTop = true;
      $('.app').addClass('top');
    } else if (onTop && yOffset >= 50) {
      onTop = false;
      $('.app').removeClass('top');
    }
  });
};
