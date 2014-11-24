// Single message contoller.


/**
 * Add preceding zero if given number has only 1 digit.
 *
 * TODO: Move to utilities package.
 *
 * @param  {Number} number
 * @return {String/Number}
 */
zeropad = function(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
};


/****************************************************************************/
/* Message HELPERS */
/****************************************************************************/
Template.message.helpers({

  /**
   * Formats the created time of the message in a user friendly way.
   *
   * NOTE: Do we want a global, more powerful, function for this?
   *       For example this one looks interesting:
   *       http://jacwright.com/projects/javascript/date_format/
   *
   * @return {String} "DAY/MONTH, HOUR:MIN" - day/month is omitted when the
   *                  message is from today.
   */
  time: function() {
    if (this.created === undefined)
      return '';

    var today   = new Date();
    var created = new Date(this.created);
    var time = '';

    // Same day?
    if (today.toLocaleDateString() != created.toLocaleDateString()) {
      time += created.getDate() + '/' + created.getMonth();

      // Same year?
      var timeBetween = new Date(today.getTime() - created.getTime());
      var years = timeBetween.getTime() * 3.16888e-11;
      if (years > 1) {
        time += '/' + created.getYear();
      }

      time += ', ';
    }

    time += zeropad(created.getHours()) + ':' + zeropad(created.getMinutes());

    return {
      full : created.toLocaleString(), // displayed on hover
      short: time                      // displayed inline
    };
  },


  /**
   * Gets the author of the current message. Used for displaying the username,
   * avatar and profile link.
   *
   * @return {Object} user object
   */
  senderIsOnline: function() {
    return !! Meteor.users.findOne({
      _id: this._id,
      'status.online': true
    });
  },


  /**
   * Checks if the message is from the current user.
   *
   * @return {String/Boolean}
   */
  isOwnMessage: function() {
    return Meteor.userId() == this.from._id ? 'own' : false;
  }

});
