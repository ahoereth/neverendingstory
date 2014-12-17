Meteor.publish('activities', function () {
    return Activities.find();

    });









Activities.allow({


  insert: function(userId, doc) {
    if ( isDebug() )
      return true;

    return false;
  },



  update: function(userId, doc, fields, modifiers) {
    if ( isDebug() )
      return true;

    return false;
  },


  remove: function(userId, doc) {
    if ( isDebug() )
      return true;

    return false;
  }
});
