
Template.landing.helpers({

    'featuredStories': function() {
      return Stories.find({}, {limit: 2});
    }

});
