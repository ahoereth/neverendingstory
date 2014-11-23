// Client side toast notification code.

// The toast notifications reactive variable which holds all the individual
// notifications in an array.
Toasts.toasts = new ReactiveVar([]);


/**
 * Shows a toast notification.
 *
 * @param {Object} args
 *   {String/Number} identifier
 *   {String}        message
 *   {String}        level: notice/warning/error
 *   {Number}        timeout
 */
Toasts.add = function(args) {
  // Get current toasts.
  var toasts = Toasts.toasts.get() || [];

  // Is this toast already in active currently?
  if (_.findWhere(toasts, {name: args.identifier}))
    return;

  // Add to the toast array.
  toasts.push(args);

  // Update the reactive variable.
  Toasts.toasts.set(toasts);

  // If a timeout is defined, set it.
  if (args.timeout) {
    setTimeout(function() {
      Toasts.remove(args.identifier);
    }, args.timeout);
  }
};

/**
 * Hides an active toast notification.
 *
 * @param  {String/Number} identifier
 */
Toasts.remove = function(identifier) {
  // Get current toast array.
  var toasts = Toasts.toasts.get() || [];

  // Get the toast which should be removed.
  var toRemove = _.findWhere(toasts, {identifier: identifier});

  // Remove it.
  toasts = _.without(toasts, toRemove);
  Toasts.toasts.set(toasts);
};
