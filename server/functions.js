// Serverside helper function definitions.

/**
 * Checks if the app currently is in debug mode. To run the app in debug mode
 * call the following on the commandline.
 *
 * NODE_OPTIONS='--debug' meteor
 *
 * @see http://www.meteorpedia.com/read/Environment_Variables
 *
 * @return {Boolean}
 */
isDebug = function() {
  return process.env.NODE_OPTIONS == '--debug';
};
