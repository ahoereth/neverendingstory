// Clientside routes. Definition needs to be global - investigating.
// Documentation: http://eventedmind.github.io/iron-router

/**
 * ROUTE: /
 * REDIRECT: /stories
 *
 * The landing page. Currently only redirects.
 */
Router.route('/', function() {
  this.redirect('/stories');
}, {
  name: 'home'
});


/**
 * ROUTE: /stories
 *
 * The stories index. Should probably support paginaging in the future.
 */
Router.route('/stories', function() {
  // We might come here from a different page.
  // Stop all unneeded subscribtions.
  cleanHandlers();

  // Subscribe to the general story index.
  this.subscribe('stories').wait();
  this.render('stories');
}, {
  name: 'stories.index'
});


/**
 * ROUTE /story/:id
 *
 * An individual story. Not using /stories/:id because of possible paging
 * for the story index in later iterations.
 */
Router.route('/story/:_id', function() {
  var _id = this.params._id;

  // Subscribe to the specific story.
  var storyHandler = Meteor.subscribe('stories', _id);
  this.wait(storyHandler);
  handlers.push(storyHandler);

  // Subscribe to the paragraphs of the story.
  var componentHandler = Meteor.subscribe('components', _id);
  this.wait(componentHandler);
  handlers.push(componentHandler);

  // Subscribe to the currently in question paragraphs of this story.
  var newParagraphHandler = Meteor.subscribe('components', _id, 'latest');
  this.wait(newParagraphHandler);
  handlers.push(newParagraphHandler);

  // Subscribtions are ready.
  if ( this.ready() ) {
    // Check if there is a story with this _id.
    var story = Stories.findOne(_id);

    // There is a story with this id, render it.
    if (story) {
      this.render('story', {
        data: story
      });

    // No story with this _id. Redirect to stories index.
    } else {
      this.redirect('stories.index');
    }

  // Subscribtions are not ready yet, show loading screen.
  } else {
    this.render('loading');
  }
}, {
  name: 'stories.show'
});


/**
 * Function for stopping all currently registered handlers and emptying
 * the handlers array.
 */
function cleanHandlers() {
  _.each(handlers, function(handler) {
    handler.stop();
  });
  handlers = [];
}

// The handlers array. All handlers who are to be cleaned up on the next
// route change are pushed to this array.
var handlers = [];
