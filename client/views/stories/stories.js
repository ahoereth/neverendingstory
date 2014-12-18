// Stories controller.

/****************************************************************************/
/* Stories HELPERS */
/****************************************************************************/
Template.stories.helpers({

  /**
   * Expose the stories to the view.
   */
  stories: function() {
    var filter = Template.instance().genre.get();
    if (_.isString(filter)) {
      return Stories.find({genre: filter});
    }

    return Stories.find();
  },

  /**
   * Available genre list.
   */
  genres: function() {
    var stories = Stories.find().fetch();
    return _.reduce(stories, function(memo, story) {
      if (story.genre && -1 === _.indexOf(memo, story.genre))
        memo.push(story.genre);
      return memo;
    }, []);
  },

  genre: function() {
    return Template.instance().genre.get();
  }
});


Template.stories.events({
  'click .genre': function(e, tmpl) {
    var o = tmpl.genre.get();
    var n = tmpl.$(e.target).html();

    tmpl.genre.set((o == n ? null : n));
  }
})

Template.stories.created = function() {
  var tmpl = this;

  tmpl.genre = new ReactiveVar(null);
};
