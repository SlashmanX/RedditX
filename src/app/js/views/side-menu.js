var Reddit = require('node-reddit');
var reddit;
var Q = require('q');
(function (App) {
	'use strict';

	var SideMenu = Backbone.Marionette.ItemView.extend({
		template: '#side-menu-tpl',

		events : {
			'click .authenticate' : 'launchOAuth'
		},

		launchOAuth : function(e) {
			e.preventDefault();
			var gui = require('nw.gui');
			gui.App.addOriginAccessWhitelistEntry('https://ssl.reddit.com/', "app", "host", true); 
			var win = gui.Window.open($(e.target).attr('href'), {
				toolbar: false,
				frame: false,
				focus: true,
				position: 'center'
			});
		}
		
	});

App.View.SideMenu = SideMenu;
})(window.App);