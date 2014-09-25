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
	View: {},
	Model: {},
	Providers: {}
});

App.addRegions({
	Window: '.main-window-region'
});

App.on('start', function(options) {
	setTimeout(function() { // XXX: No idea why I need this, event are not firing correctly, will readdress
		try {
			App.Window.show(new App.View.MainWindow());
		} catch (e) {
			console.error('Couldn\'t start app: ', e, e.stack);
		}
		win.show();
	}, 20)

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
	var menubar = new gui.Menu({ type: "menubar" });
	if(process.platform === 'darwin') {
		menubar.createMacBuiltin("RedditX", {
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
		if( event.keyCode == 123 ) { win.showDevTools(); }
		// F14 Reloads
		if( event.keyCode == 122 ) { win.reloadIgnoringCache(); }
	});
}

var preventDefault = function(e) {
	e.preventDefault();
}