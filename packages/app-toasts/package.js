Package.describe({
  summary: "Toasts"
});

Package.on_use(function (api) {
  api.use([
    'templating',
    'less',
    'session',
    'reactive-var',
    'underscore'
  ], 'client');

  api.add_files('namespace.js');

  // client side functionality
  api.add_files('lib/client.js', 'client');

  // views
  api.add_files([
    'views/toasts.less',
    'views/toasts.html',
    'views/toasts.js',
    'views/toasts_toast.html'
  ], 'client');

  api.export('Toasts');
});
