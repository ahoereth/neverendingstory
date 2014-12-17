Meteor.publish('activities', function (user_id) {
  check(user_id, Match.Optional(MeteorID));
    return Activities.find({user_id:user_id});
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
