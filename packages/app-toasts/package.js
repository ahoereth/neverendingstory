Package.describe({
  summary: "Toasts"
});

Package.on_use(function (api) {
  // client dependencies
  api.use([
    'templating',
    'less',
    'session',
    'reactive-var',
    'underscore'
  ], 'client');

  // global namespace
  api.add_files('namespace.js');

  // client side functionality
  api.add_files('lib/client.js', 'client');

  // views
  api.add_files([
    'views/toasts.less',
    'views/toasts.html',
    'views/toasts.js'
  ], 'client');

  api.export('Toasts');
});
