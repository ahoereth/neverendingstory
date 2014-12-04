// Global Stories collection manipulation methods.
// Documentation: http://docs.meteor.com/#methods_header

Meteor.methods({

  /**
   * Creates a new story.
   *
   * @param {String} title
   * @param {String} preface
   */
  'users/exists': function(args) {
    check(args, {
      username: NonEmptyString
    });

    if (Meteor.isServer) {
      var user = Meteor.users.findOne({
        username: args.username
      }, {
        reactive: false,
        fields: { username: 1 }
      });

      return !!user;
    }
  },


  'users/follow': function(args){
    check(args, {
      seenid: NonEmptyString
    });

   Meteor.users.update({_id: args.seenid}, {$inc:{"profile.followerNum":1}});
 },

 'users/unfollow': function(args){
   check(args, {
     seenid: NonEmptyString
   });

  Meteor.users.update({_id: args.seenid}, {$inc:{"profile.followerNum":-1}});
},


  'users/addFollowed': function(args){
  check(args, {
    seenid: NonEmptyString
  });
  Meteor.users.update({_id:Meteor.user()._id},{ $push: { "profile.followed": {_id:args.seenid}} });
 },

 'users/removeFollowed': function(args){
 check(args, {
   seenid: NonEmptyString
 });
 Meteor.users.update(
    {_id:Meteor.user()._id},
    { $pull: { "profile.followed": {_id:args.seenid} } }
  );
 }



});
