// toasts template controls.


// ************************************************************************** //
// HELPERS
Template.toasts.helpers({

  // Toasts retrieved from the package's reactive variable.
  toasts: function() {
    return Toasts.toasts.get();
  },

  // Top level class of the main template. Used for applying or ignoring
  // the default package styles.
  class: function() {
    var data = Template.instance().data;
    return ! _.isEmpty(data) && _.isString(data) ? data : 'styled';
  }

});



// ************************************************************************** //
// RENDERED
Template.toasts.rendered = function(tmpl) {
  // The duration in ms of the CSS transitions as defined in layout.less
  var cssTransitionDuration = 500;

  this.find(".toasts")._uihooks = {

    // Element insertion.
    insertElement: function(node, next) {
      var $node = $(node);

      // Add to DOM and set initial state.
      $node.addClass('hide').insertBefore(next);

      // Kick off the transition.
      setTimeout(function() {
        $node.removeClass('hide');
      }, 1);
    },

    // Element removal.
    removeElement: function(node) {
      var $node = $(node);

      // Fire the CSS transition.
      $node.addClass('hide');

      // Remove from DOM when the transition is done.
      setTimeout(function() {
        $node.remove();
      }, toMilliseconds($node.css('transition-duration')));
    }
  };
};


/**
 * Parses a given string to milliseconds.
 * E.g.: 0.3s -> 300
 *       40ms -> 40
 *
 * @param  {String} time
 * @return {Number} time in ms
 */
function toMilliseconds(time) {
  time = time.toLowerCase();
  var isMS = time.indexOf("ms") >= 0;
  var numberStr = time.match(/\d*\.?\d*/);
  var numberNum = parseFloat(numberStr[0], 10);
  return isMS ? numberNum : numberNum * 1000;
}
