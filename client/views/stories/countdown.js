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

  //Do this only if nextElectionDate has been defined for this story

    // This should be changed into the value retrieved from the server
    var countdown = 259200;
    //new Date(Stories.findOne(this._id).nextElectionDate) - Date.now();

    //Reactive variable for time in seconds
    this.timer = new ReactiveVar(countdown);

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
    if(Stories.findOne(this._id).nextElectionDate != undefined){
      return timeToText(Template.instance().timer.get());
    }else{
      return "No Election Yet";
    }
  }

});
