// Server only code to run initially.

Meteor.startup(function () {
  Meteor.call('stories/watchNextElection');

  // Watch the election date of the next story coming up because if it changes
  // we need to check the closest upcoming election again. Mostly
  // interesting when debugging.
  var storyCursor = Stories.find({
    nextElectionDate: {$exists: true}
  }, {
    sort  : {nextElectionDate: 1},
    fields: {nextElectionDate: 1},
    limit : 1
  }).observeChanges({
    changed: function(id, fields) {
      if (! _.isUndefined(fields.nextElectionDate)) {
        Meteor.call('stories/watchNextElection')
      }
    }
  })
});
