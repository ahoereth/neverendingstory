// Bio new controller.

/****************************************************************************/
/* Bio_new EVENTS */
/****************************************************************************/
Template.profile_edit.events({

  /**
   *
   * TODO: Error handling.
   */
   'submit form': function(e, tmpl) {
        handleNaturally(e);
  //   // Get the form data.


     var form = tmpl.$(e.target);
     var fields = parseForm(form);

     if ( ! fields.biocontent.length )
       return;

     var newbio=fields.biocontent;
      Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.bio":newbio}});
     var username=Meteor.user().username;
     Router.go("/profile/"+username);

},



});





/****************************************************************************/
/* Join RENDERED */
/****************************************************************************/
