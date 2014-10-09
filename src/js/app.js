var applicationRoot = './';

var gui = require('nw.gui');

// Debug flag
var isDebug = gui.App.argv.indexOf('--debug') > -1;

var win = gui.Window.get();
var os = require('os');
var path = require('path');
var fs = require('fs');
var url = require('url');
var moment = require('moment');
var Q = require('q');

// Load in external templates
_.each(document.querySelectorAll('[type="text/x-template"]'), function(el) {
	$.get(el.src, function(res) {
		el.innerHTML = res;
	});
});
// Global App skeleton for backbone
var App = new Backbone.Marionette.Application();
_.extend(App, {
	View: {},
	Model: {},
	Providers: {}
});

App.addRegions({
	Window: '.main-window-region'
});

var initTemplates = function() {
	// Load in external templates
	var ts = [];

	_.each(document.querySelectorAll('[type="text/x-template"]'), function (el) {
		var d = Q.defer();
		$.get(el.src, function (res) {
			el.innerHTML = res;
			d.resolve(true);
		});
		ts.push(d.promise);
	});

	return Q.all(ts);

};

var initApp = function() {
	var mainWindow = new App.View.MainWindow();
	win.show();

	try {
		App.Window.show(mainWindow);
	} catch (e) {
		console.error('Couldn\'t start app: ', e, e.stack);
	}
};

App.addInitializer(function (options) {
	initTemplates()
	.then(initApp);
});


// Not debugging, hide all messages!
if (!isDebug) {
	console.log = function() {};
	console.time = console.timeEnd = function() {};
	console.logger = {};
	console.logger.log = function() {};
	console.logger.debug = console.logger.log;
	console.logger.info = console.logger.log;
	console.logger.warn = console.logger.log;
	console.logger.error = console.logger.log;
} else {
	// Developer Menu building
	var menubar = new gui.Menu({ type: 'menubar' });
	if(process.platform === 'darwin') {
		menubar.createMacBuiltin('RedditX', {
			hideEdit: true,
			hideWindow: true
		});
	}
	var developerSubmenu = new gui.Menu();

	var developerItem = new gui.MenuItem({
		label: 'Developer',
		submenu: developerSubmenu
	}),
	debugItem = new gui.MenuItem({
		label: 'Show developer tools',
		click: function () {
			win.showDevTools();
		}
	});
	menubar.append(developerItem);
	developerSubmenu.append(debugItem);
	win.menu = menubar;
	// Developer Shortcuts
	document.addEventListener('keydown', function(event){
		// F13 Opens DevTools
		if( event.keyCode === 123 ) { 
			win.showDevTools(); 
		}
		// F14 Reloads
		if( event.keyCode === 122 ) { 
			win.reloadIgnoringCache(); 
		}
	});
}

var preventDefault = function(e) {
	e.preventDefault();
};