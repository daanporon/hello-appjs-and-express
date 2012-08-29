
/**
 * Module dependencies.
 */

var express = require('express'),
	appjs = require('appjs'),
	utils = require('util')
;

var appRouter = express.createServer();
appRouter.use(express.bodyParser());
appRouter.register('jade', require('jade').express);

/**
 * Set up the express routes
 */
appRouter.get('/', function(req, res, next){
  res.render('index.jade', { layout: false, title: 'Express' });
});

/**
 * Setup AppJS
 */

// override AppJS's built in request handler with connect
appjs.router.handle = appRouter.handle.bind(appRouter);

// create window
var window = appjs.createWindow({
  width : 640,
  height: 460
});

// show the window after initialization
window.on('create', function(){
  window.frame.show();
  window.frame.center();
});

// add require/process/module to the window global object for debugging from the DevTools
window.on('ready', function(){
  window.require = require;
  window.process = process;
  window.module = module;
});