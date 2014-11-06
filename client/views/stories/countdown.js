/*
* Function to parse time in seconds into text displayed on the page
*/

var timeToText = function(t){
  var days = Math.floor(t/(60*60*24));
  var hours = Math.floor((t - days*60*60*24)/(60*60));
  var mins = Math.floor((t - days*60*60*24 - hours*60*60)/60);
  var secs = t - days*60*60*24 - hours*60*60 - mins*60;

  return days + "d - " + hours + "h - " + mins + "m - " + secs + "s";
}

Template.countdown.created = function() {

  //Reactive variable for time in seconds
  this.timer = new ReactiveVar;
  // This should be changed into the value retrieved from the server
  this.timer.set(604800);

  //Decrease the time every second
  var template = Template.instance();
  setInterval(function() {
      template.timer.set(template.timer.get()-1);
  }, 1000);

};


/****************************************************************************/
/* Countdown HELPERS */
/****************************************************************************/

Template.countdown.helpers({

  timeRemaining: function () {
    return timeToText(Template.instance().timer.get());
  }

});
