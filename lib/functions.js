(function() {
  // Global helper functions.

  /**
   * Calculates a new priority from a given component. Basically checks
   * the components priority and if there is a component with a higher priority.
   * Depending on the latter the new priority is in between those or just the
   * previous priority + 1.
   *
   * @param  {Component} component
   * @return {double}
   */
  getNewPriority = function(component) {
    if ( _.isUndefined(component) )
      return 1;

    var prevPriority = component.priority, nextPriority;
    var decimal = prevPriority % 1;
    if ( decimal == 0 ) {
      nextPriority = prevPriority + 1;
    } else {
      nextPriority = prevPriority + (decimal/2);
    }

    return Math.round(nextPriority*1e20) / 1e20;
  }


  // Modern browsers already support Date.now - only define it if it is not
  // available.
  if ( ! Date.now ) {

    /**
     * Returns the current millisecond timestamp.
     *
     * @return {int}
     */
    Date.now = function() {
      return new Date().getTime();
    };

  }


  /**
   * Sleeps for a specified amount of time. This produces high CPU load! Only
   * meant for debugging and simulating slow server responses.
   *
   * @param  {int} milliseconds
   */
  sleep = function(milliseconds) {
    var start = Date.now();
    while( (Date.now() - start) < milliseconds );
  }

})();
