// Messages controller.

/****************************************************************************/
/* Messages HELPERS */
/****************************************************************************/
Template.messages.helpers({

  /**
   * Returns the messages in reverse order.
   */
  messagesReverse: function() {
    var messages = this.messages.fetch();
    return messages.reverse();
  }

});




/****************************************************************************/
/* Messages RENDERED */
/****************************************************************************/
Template.messages.rendered = function() {
  var  list = this.find(".messages");
  var $list = $(list);

  /**
   * Scrolls to the bottom of the $list element with a slow animation.
   */
  var scrollToEnd = function() {
    $list.animate({ scrollTop: $list[0].scrollHeight }, 'slow');
  };

  // Scroll to the bottom initially.
  Meteor.setTimeout(scrollToEnd, 500);

  // Hook into Blaze rendering events.
  list._uihooks = {

    // Element insertion.
    insertElement: function(node, next) {
      $(node).insertBefore(next);
      scrollToEnd();
    }

  };

};
