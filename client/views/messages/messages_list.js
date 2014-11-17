// Messages List controller.

/****************************************************************************/
/* Messages List HELPERS */
/****************************************************************************/
Template.messages_list.helpers({

  /**
   * Returns the messages in reverse order.
   */
  messagesReverse: function() {
    var messages = this.messages.fetch();
    return messages.reverse();
  }

});




/****************************************************************************/
/* Messages List RENDERED */
/****************************************************************************/
Template.messages_list.rendered = function() {
  var  list = this.find(".messages-list");
  var $list = $(list);

  /**
   * Scrolls to the bottom of the $list element with a slow animation.
   */
  var scrollToEnd = function() {
    $list.animate({ scrollTop: $list[0].scrollHeight }, 'slow');
    //$list.scrollTop( $list[0].scrollHeight );
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
