// Single message contoller.

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

    time += created.getHours().zeropad(2) + ':' + created.getMinutes().zeropad(2);

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
  theAuthor: function() {
    return Meteor.users.findOne(this.from);
  },


  /**
   * Checks if the message is from the current user.
   *
   * @return {String/Boolean}
   */
  own: function() {
    return Meteor.userId() == this.from ? 'own' : false;
  }

});
