/*
* Function to parse time in seconds into text displayed on the page
*/

var timeToText = function(t){
  t = Math.floor(t/1000);
  var days = Math.floor(t/(60*60*24));
  var hours = Math.floor((t - days*60*60*24)/(60*60));
  var mins = Math.floor((t - days*60*60*24 - hours*60*60)/60);
  var secs = t - days*60*60*24 - hours*60*60 - mins*60;

  return days + "d - " + hours + "h - " + mins + "m - " + secs + "s";
};

Template.countdown.created = function() {

  var nextElectionDate = Stories.findOne(this.data._id).nextElectionDate;
  this.timer = new ReactiveVar(0);

  // Run the countdown and returns the id of the setInterval
  function runCountdown(nextElectionDate, timer){
    var next = new Date(nextElectionDate), now = new Date();
    var countdown = next - now;
    timer.set(countdown);
    return setInterval(function() {
        timer.set(timer.get()-1000);
    }, 1000);
  }

  // We need to observe the nextElectionDate variable anyway in case it's unset
  var self = this;
  Stories.find(this.data._id, {fields : {nextElectionDate : 1}}).observeChanges({
    changed: function (id, fields){
      if(!_.isUndefined(fields.nextElectionDate)){
        self.timer_id = runCountdown(fields.nextElectionDate, self.timer);
      }else{
        clearInterval(self.timer_id);
      }
    }
  });

  // If it is set, we run it from the beginning
  if(!_.isUndefined(nextElectionDate)){
    self.timer_id = runCountdown(nextElectionDate, this.timer);
  }

};


/****************************************************************************/
/* Countdown HELPERS */
/****************************************************************************/

Template.countdown.helpers({

  timeRemaining: function () {
    if(_.isUndefined(this.nextElectionDate)){
      return "No Election Yet";
    }else{
      return timeToText(Template.instance().timer.get());
    }
  }

});
