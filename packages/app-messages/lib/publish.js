// Messages publish functions.
// *server

Meteor.publish('messages', function (args) {
  args = args || {};

  check(args, {
    from : Match.Optional(String),
    to   : Match.Optional(String),
    scope: Match.Optional(String),
    limit: Match.Optional(Number)
  });

  var selector = _.pick(args, 'from', 'to', 'scope');
  var options  = _.pick(args, 'limit');

  // Default limit. Parse to int in case a float is given.
  options.limit = parseInt(selector.limit || 100, 10);

  // We are always just interested in the most recent messages.
  options.sort = {createdAt: -1};

  return Messages.find(selector, options);
});
