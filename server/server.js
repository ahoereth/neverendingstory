// Server only code to run initially.

Meteor.startup(function () {
  Meteor.call('stories/watchNextElection');
});
