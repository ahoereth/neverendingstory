// Profile controller.



/****************************************************************************/
/* Profile EVENTS */
/****************************************************************************/
Template.profile.events({


/*
* Follow or Unfollow a user
*/
'click .followBtn': function(e,tmpl){
// id of seen user
var seenid=document.getElementById("seenprofileID").value;

var followed=(Meteor.users.findOne({_id:Meteor.user()._id}, {profile: 1})).profile.followed;

// not followed by anybody yet
  if(followed==undefined){

    Meteor.call('users/addFollowed', {
      seenid  : seenid
    });

    Meteor.call('users/follow', {
      seenid  : seenid
    });

  }

  else{

    var isAlreadyFollowed= $.grep(followed, function(e){ return e._id == seenid; }).length;

    if(isAlreadyFollowed>=1){
      Meteor.call('users/removeFollowed', {
      seenid  : seenid
      });

      Meteor.call('users/unfollow', {
        seenid  : seenid
      });
    }

    else{
      Meteor.call('users/addFollowed', {
        seenid  : seenid
      });

      Meteor.call('users/follow', {
        seenid  : seenid
      });

  }
}

},


  /**
   * Logout.
   */
  'click .logout': function(e, tmpl) {
    Meteor.logout();
    Router.go('/');
  }

});



/****************************************************************************/
/* Profile HELPERS */
/****************************************************************************/
Template.profile.helpers({

  /**
   * Expose the stories to the view.
   */
  profile: function() {

  },

  allusers: function(){
    return Meteor.users.find();
  },

  seenprofile:function(){
    var seenprofile=this;
    return seenprofile[0];
  },
   currentUserIdIs:function(seenprofileuserID){
    return Meteor.user()._id===seenprofileuserID;
  },

  isAlreadyfollowing:function(seenprofileuserID){
    var followed=(Meteor.users.findOne({_id:Meteor.user()._id}, {profile: 1})).profile.followed;
    console.log(followed);
    if(followed==undefined) return false;
    var res= $.grep(followed, function(e){ return e._id == seenprofileuserID; }).length;
    if(res>0) return true;
    return false;
  },


  followersExits:function(seenprofileuserID){
  var user=Meteor.users.find({_id:seenprofileuserID}, {profile :1}).fetch();
   var followernum=user[0].profile.followerNum;
   if(followernum===undefined){
     return false;
   }
   return true;
 },

  followingNum:function(seenprofileuserID){
    var followed=(Meteor.users.findOne({_id:seenprofileuserID}, {profile: 1})).profile.followed;
    if(followed==undefined) return 0;
    return followed.length;
  }


});
