/* 
Settings app, getter & setter local storage
*/

Settings = {
	"_defaultSettings": {
		// Default to first version
		"version": "0.0.1",
		// Used to check if there's an internet connection
		"connectionCheckUrl": "http://www.google.com",
		// Used to store the current active account 
		// (allows for account switching in the future)
		// Has to be '-1' as null generates new object
		// with backbone.localStorage
		"activeUserId": -1
	},

	"setup": function(forceReset) {
		// This gives the official version (the package.json one)

		gui = require('nw.gui'); // Load native UI library
		var currentVersion = gui.App.manifest.version;

		// check system
		Settings.getHardwareInfo();
	},

	"get": function(variable) {
		return localStorage['settings_'+ variable] || Settings._defaultSettings[variable];
	},

	"set": function(variable, newValue) {
		localStorage.setItem('settings_'+ variable, newValue);
	},

	"getHardwareInfo": function() {
		if(/64/.test(process.arch))
			Settings.set('arch', 'x64');
		else
			Settings.set('arch', 'x86');

		switch(process.platform) {
			case 'darwin':
			Settings.set('os', 'mac');
			break;
			case 'win32':
			Settings.set('os', 'windows');
			break;
			case 'linux':
			Settings.set('os', 'linux');
			break;
			default:
			Settings.set('os', 'unknown');
			break;
		}
	}
};

Settings.setup();