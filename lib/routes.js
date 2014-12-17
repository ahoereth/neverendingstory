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
    return [
      Meteor.subscribe('stories'),
      Meteor.subscribe('messages', {limit: 5})
    ];
  },
  data: function() {
    return {
      stories : Stories.find({}, {limit: 2}),
      messages: Messages.find({}, {limit: 5, sort: {created: -1}})
    };
  }
});


/**
 * ROUTE: /join
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
 * REDIRECT: /profile
 *
 * Profile page.
 */

Router.route('/profile/:username', function() {
  this.render();
}, {
  name: 'profile', //
  waitOn: function() {
    return [   //TODO: subscribe to  activities only this user is interested in
    Meteor.subscribe('activities'),
    Meteor.subscribe('profile',this.params.username)

    ];

  },
  data: function() {
    return Meteor.users.find({username: this.params.username}).fetch();
  }
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
    return [
      Meteor.subscribe('stories', _id),
      Meteor.subscribe('components', _id),
      Meteor.subscribe('components', _id, 'latest')
    ];
  },
  data: function() {
    return Stories.findOne(this.params._id);
  }
});



/**
 * ROUTE: /chat
 *
 * Public chat page.
 */
Router.route('/chat', function() {
  this.render();
}, {
  name: 'chat',
  waitOn: function() {
    return Meteor.subscribe('messages', {scope: 'public', limit: 100});
  },
  data: function() {
    return {
      messages: Messages.find({scope: 'public'}, {sort: {createdAt: -1}})
    };
  }
});


// When the data function of a route returns a falsy value the 404 template
// is being rendered automatically.
Router.plugin('dataNotFound', {notFoundTemplate: '404'});
