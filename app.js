
/**
 * Module dependencies.
 */

var express = require('express'),
	appjs = require('appjs'),
	routes = require('./routes'),
	utils = require('util')
;

var app = module.exports = express.createServer();

// Configuration
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Routes
app.get('/', routes.index);
app.all('/video', routes.video);

/**
 * Listen to http requests
 */
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


/**
 * Setup AppJS
 */
appjs.router.handle = app.handle.bind(app);

var window = appjs.createWindow({
  width : 640,
  height: 460
});

window.on('create', function(){
  window.frame.show();
  window.frame.center();
});

window.on('ready', function(){
  window.require = require;
  window.process = process;
  window.module = module;
  window.addEventListener('keydown', function(e){
    if (e.keyIdentifier === 'F5') {
      window.frame.openDevTools();
    }
  });
});