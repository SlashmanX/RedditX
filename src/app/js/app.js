var
	// Configuration variable
	applicationRoot = './',

	// Load native UI library
	gui = require('nw.gui'),

	// Debug flag
	isDebug = gui.App.argv.indexOf('--debug') > -1,

	// browser window object
	win = gui.Window.get(),

	// os object
	os = require('os');

	// path object
	path = require('path'),

	// fs object (file system)
	fs = require('fs'),

	// url object
	url = require('url');

// Load in external templates
_.each(document.querySelectorAll('[type="text/x-template"]'), function(el) {
    $.get(el.src, function(res) {
        el.innerHTML = res;
    });
});
// Global App skeleton for backbone
var App = new Backbone.Marionette.Application();
_.extend(App, {
    Controller: {},
    View: {},
    Model: {},
    Page: {},
    Scrapers: {},
    Providers: {},
    Localization: {}
});

App.addRegions({
    Window: '.main-window-region'
});

App.addInitializer(function(options) {
    var mainWindow = new App.View.MainWindow();
    win.show();
    try {
        App.Window.show(mainWindow);
    } catch (e) {
        console.error('Couldn\'t start app: ', e, e.stack);
    }
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
	var menubar = new gui.Menu({ type: 'menubar' }),
	developerSubmenu = new gui.Menu(),
	developerItem = new gui.MenuItem({
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
		if( event.keyCode == 124 ) { win.showDevTools(); }
		// F14 Reloads
		if( event.keyCode == 125 ) { win.reloadIgnoringCache(); }
	});

	// Special Debug Console Calls!
	console.logger = {};
	console.logger.log = console.log.bind(console);
	console.logger.debug = function() {
		var params = Array.prototype.slice.call(arguments, 1);
		params.unshift('%c[%cDEBUG%c] ' + arguments[0], 'color: black;', 'color: #00eb76;', 'color: black;');
		console.debug.apply(console, params);
	}
	console.logger.info = function() {
		var params = Array.prototype.slice.call(arguments, 1);
		params.unshift('[%cINFO%c] ' + arguments[0], 'color: blue;', 'color: black;');
		console.info.apply(console, params);
	}
	console.logger.warn = function() {
		var params = Array.prototype.slice.call(arguments, 1);
		params.unshift('[%cWARNING%c] ' + arguments[0], 'color: #ffc000;', 'color: black;');
		console.warn.apply(console, params);
	}
	console.logger.error = function() {
		var params = Array.prototype.slice.call(arguments, 1);
		params.unshift('%c[%cERROR%c] ' + arguments[0], 'color: black;', 'color: #ff1500;', 'color: black;');
		console.error.apply(console, params);
	}
}

// Set the app title (for Windows mostly)
win.title = 'RedditX';


// Focus the window when the app opens
win.focus();

var preventDefault = function(e) {
	e.preventDefault();
}
// Prevent dropping files into the window
window.addEventListener("dragover", preventDefault, false);
window.addEventListener("drop", preventDefault, false);
// Prevent dragging files outside the window
window.addEventListener("dragstart", preventDefault, false);