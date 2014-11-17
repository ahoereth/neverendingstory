// Clientside routes. Definition needs to be global - investigating.
// Documentation: http://eventedmind.github.io/iron-router


Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});


/**
 * ROUTE: /
 * REDIRECT: /stories
 *
 * The landing page. Currently only redirects.
 */
Router.route('/', function() {
  this.render('landing');
}, {
  name: 'landing',
  waitOn: function() {
    return Meteor.subscribe('stories');
  },

  // Always true because we even want to show this page when we do not have any
  // stories to show. Stories are pulled using a helper.
  data: true
});


/**
 * ROUTE: /
 * REDIRECT: /join
 *
 * The login and registration page.
 */
Router.route('/join', function() {
  this.render();
}, {
  name: 'join',
  data: true
});

/**
 * ROUTE: /
 * REDIRECT: /profilw
 *
 * Profile page.
 */

Router.route('/profile', function() {
  this.render();
}, {
  name: 'profile',
  data: true
});




Router.route('/profiledit', function() {
  this.render("profile_edit");
}, {
  data: true
});


/**
 * ROUTE: /stories
 *
 * The stories index. Should probably support paginaging in the future.
 */
Router.route('/stories', function() {
  this.render();
}, {
  name: 'stories',
  waitOn: function() {
    return Meteor.subscribe('stories');
  },

  // Always true because we even want to show this page when we do not have any
  // stories to show. Stories are pulled using a helper.
  data: true
});


/**
 * ROUTE /story/:id
 *
 * An individual story. Not using /stories/:id because of possible paging
 * for the story index in later iterations.
 */
Router.route('/story/:_id', function() {
  this.render();
}, {
  name: 'story',
  waitOn: function() {
    var _id = this.params._id;
    handlers.push(Meteor.subscribe('stories', _id));
    handlers.push(Meteor.subscribe('components', _id));
    handlers.push(Meteor.subscribe('components', _id, 'latest'));

    return handlers;
  },
  data: function() {
    return Stories.findOne(this.params._id);
  }
});


// When the data function of a route returns a falsy value the 404 template
// is being rendered automatically.
Router.plugin('dataNotFound', {notFoundTemplate: '404'});


/**
 * Function for stopping all currently registered handlers and emptying
 * the handlers array when leaving a route.
 */
Router.onStop(function() {
  _.each(handlers, function(handler) {
    handler.stop();
  });
  handlers = [];
});


// The handlers array. See the onStop function above which empties this array
// on every route change.
var handlers = [];
