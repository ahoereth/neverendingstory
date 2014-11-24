Package.describe({
  summary: "Messages"
});

Package.on_use(function (api) {
  api.use('standard-app-packages');

  // client dependencies
  api.use([
    'templating',
    'less',
    'underscore'
  ], 'client');


  // global
  api.add_files('namespace.js');
  api.add_files('lib/methods.js');

  // server
  api.add_files('lib/publish.js', 'server');

  // client
  api.add_files([
    'views/messages.less',
    'views/messages.html',
    'views/messages.js',
    'views/message.html',
    'views/message.js',
    'views/message_new.html',
    'views/message_new.js'
  ], 'client');

  api.export('Messages');
});
